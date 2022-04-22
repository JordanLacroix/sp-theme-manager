import { Palette } from "./Palette";


export interface Theme {
    name: string;
    palette: Palette;
    isInverted: boolean;
}