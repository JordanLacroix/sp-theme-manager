import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'SharePointThemeManagerWebPartStrings';
import { ISharePointThemeManagerProps } from './components/ISharePointThemeManagerProps';
import SharePointThemeManager from './components/SharePointThemeManager';


export interface ISharePointThemeManagerWebPartProps {
  description: string;
}

export default class SharePointThemeManagerWebPart extends BaseClientSideWebPart<ISharePointThemeManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharePointThemeManagerProps> = React.createElement(
      SharePointThemeManager,
      {
        description: this.properties.description,
        wpContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
