import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ThemeDTO } from '../models/ThemeDTO';


export class ThemeManagerAPI {
    private _context: WebPartContext;
    constructor(context: WebPartContext) {
        this._context = context;
    }
    public Get() {
        return this._context.spHttpClient.get("/_api/thememanager/GetTenantThemingOptions", SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            }).then((json) => {
                return json.themePreviews as ThemeDTO[];
            });
    }
    public Update(theme: ThemeDTO) {
        let options: ISPHttpClientOptions = {
            body: JSON.stringify(theme)
        };

        return this._context.spHttpClient.post("/_api/thememanager/UpdateTenantTheme", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                console.log(response)
                return response.ok
            });
    }

    public Create(theme: ThemeDTO) {
        
        console.log(theme)
        let options: ISPHttpClientOptions = {
            body: JSON.stringify(theme)
        };

        return this._context.spHttpClient.post("/_api/thememanager/AddTenantTheme", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                console.log(response)
                return response.ok
            });
    }

    public Remove(name: string) {
    
        let options: ISPHttpClientOptions = {
            body: JSON.stringify({name:name})
        };

        return this._context.spHttpClient.post("/_api/thememanager/DeleteTenantTheme", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                console.log(response)
                return response.ok
            });
    }

    public Apply(theme: ThemeDTO) {
        let options: ISPHttpClientOptions = {
            body: JSON.stringify(theme)
        };

        // Pass the theme properties to themeManagerExecution method
        return this._context.spHttpClient.post("/_api/thememanager/ApplyTheme", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                console.log(response);
                return response.ok;
            });

    };
}
