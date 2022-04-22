import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Theme } from "../models/Theme";
import { ThemeManagerHelpers } from "../utils/ThemeManagerHelpers";
import { ThemeManagerAPI } from './ThemeManagerAPI';

export class ThemeManagerService {
    private _themeManager: ThemeManagerAPI 
    constructor(context: WebPartContext) {
        this._themeManager = new ThemeManagerAPI(context);
    }
    public GetThemes() : Promise<Theme[]> {
        return this._themeManager.Get().then(themes => {
            return themes.map(theme => {
                return ThemeManagerHelpers.ToModel(theme);
            })
        })
    }
    public EditTheme(theme: Theme) {
        let dto = ThemeManagerHelpers.ToDTO(theme);
        return this._themeManager.Update(dto).then(success => {
            return success;
        })
    }

    public CreateTheme(theme: Theme) {
        let dto = ThemeManagerHelpers.ToDTO(theme);
        return this._themeManager.Create(dto).then(success=>{
            return success;
        })
       
    }

    public DeleteTheme(name: string) {
        return this._themeManager.Remove(name).then(success => {
            return success;
        })    
    }

    public ApplyTheme(theme: Theme) {
        let dto = ThemeManagerHelpers.ToDTO(theme);
        return this._themeManager.Apply(dto).then(success => {
            return success;
        })
    };
}
