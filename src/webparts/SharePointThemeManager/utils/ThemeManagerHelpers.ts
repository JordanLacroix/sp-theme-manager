import { Theme } from "../models/Theme";
import { ThemeDTO } from "../models/ThemeDTO";

export class ThemeManagerHelpers {
    public static ToModel(themeDto: ThemeDTO) {
        let theme:Theme = JSON.parse(themeDto.themeJson);
        if(theme.name == undefined)
        {
            console.log(themeDto);
            theme.name = themeDto.name;
        }      
        return theme;
    }
    public static ToDTO(theme: Theme) {
        return {name: theme.name, themeJson: JSON.stringify(theme)} as ThemeDTO;
    }
}