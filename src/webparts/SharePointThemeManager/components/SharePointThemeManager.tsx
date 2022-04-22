import * as React from 'react';
import { ThemeManagerService } from '../services/ThemeManagerService';
import { ISharePointThemeManagerProps } from './ISharePointThemeManagerProps';
import ThemeListForm from './ThemeListForm/ThemeListForm';

export default class SharePointThemeManager extends React.Component<ISharePointThemeManagerProps, {}> {
  private _themeManagerService:ThemeManagerService; 
  constructor(props)
  {
    super(props);
    this._themeManagerService = new ThemeManagerService(this.props.wpContext);
  }
  public render(): React.ReactElement<ISharePointThemeManagerProps> {
    return (
      <div>      
        <ThemeListForm service={this._themeManagerService}/>
      </div>
    );
  }
}
