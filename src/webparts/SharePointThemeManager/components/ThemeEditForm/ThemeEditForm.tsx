import { IStackProps, MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { Dialog, IDialogContentProps, SwatchColorPicker } from 'office-ui-fabric-react';
import * as React from 'react';
import { Palette } from '../../models/Palette';
import { Theme } from '../../models/Theme';
import { IThemeFormProps } from '../IThemeFormProps';

const modelProps = {
    isBlocking: true,
    topOffsetFixed: true,
};

const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

interface IThemeEditFormProps extends IThemeFormProps {
    theme: Theme;
    dismiss: any;
}

enum EditStatus {
    idle,
    success,
    error   
}

const ThemeEditForm: React.FC<IThemeEditFormProps> = ({ children, service, theme, dismiss }) => {
    const [sptheme, setTheme] = React.useState<Palette>(theme.palette)
    const [editStatus, SetEditStatus] = React.useState<EditStatus>(EditStatus.idle);
    const [errorMessage, SetErrorMessage] = React.useState<string>("");
    const stackTokens = { childrenGap: 20 }
    console.log(theme)
    
    function _getDialogContentProps(name: string): IDialogContentProps {
        return { title: name }
    }

    function _handleSave() {
        let t = theme as Theme;
        t.palette = sptheme;
        service.EditTheme(t).then(success=>{
            SetEditStatus(EditStatus.success);
        }).catch(err=>{
            SetErrorMessage(err);
        })
    }

    return <Dialog onDismiss={dismiss} hidden={sptheme ? false : true} modalProps={modelProps} dialogContentProps={_getDialogContentProps(theme.name)} minWidth={600}>
        <Stack horizontal tokens={stackTokens} >
            <Stack {...columnProps}>
                <TextField label="Theme Primary" defaultValue={sptheme.themePrimary} width={250} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themePrimary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "1", color: sptheme.themePrimary }]} />
                <TextField label="Neutral Primary" defaultValue={sptheme.neutralPrimary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralPrimary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "2", color: sptheme.neutralPrimary }]} />
                <TextField label="Neutral Primary Alt" defaultValue={sptheme.neutralPrimaryAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralPrimaryAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "3", color: sptheme.neutralPrimaryAlt }]} />
                <TextField label="Theme Secondary" defaultValue={sptheme.themeSecondary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeSecondary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "4", color: sptheme.themeSecondary }]} />
                <TextField label="Neutral Secondary" defaultValue={sptheme.neutralSecondary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralSecondary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "5", color: sptheme.neutralSecondary }]} />
                <TextField label="Theme Tertiary" defaultValue={sptheme.themeTertiary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeTertiary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "6", color: sptheme.themeTertiary }]} />
                <TextField label="Neutral Tertiary" defaultValue={sptheme.neutralTertiary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralTertiary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "7", color: sptheme.neutralTertiary }]} />
                <TextField label="Neutral Tertiary Alt" defaultValue={sptheme.neutralTertiaryAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralTertiaryAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "8", color: sptheme.neutralTertiaryAlt }]} />
                <TextField label="Neutral Quaternary" defaultValue={sptheme.neutralQuaternary} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralQuaternary: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "8", color: sptheme.neutralQuaternary }]} />
                <TextField label="Neutral Quaternary Alt" defaultValue={sptheme.neutralQuaternaryAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralQuaternaryAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "9", color: sptheme.neutralQuaternaryAlt }]} />
                <TextField label="Theme Dark" defaultValue={sptheme.themeDark} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeDark: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "10", color: sptheme.themeDark }]} />
            </Stack>
            <Stack {...columnProps}>
                <TextField label="Neutral Dark" defaultValue={sptheme.neutralDark} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralDark: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "11", color: sptheme.neutralDark }]} />
                <TextField label="Theme Dark Alt" defaultValue={sptheme.themeDarkAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeDarkAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "12", color: sptheme.themeDarkAlt }]} />
                <TextField label="Theme Darker" defaultValue={sptheme.themeDarker} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeDarker: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "13", color: sptheme.themeDarker }]} />
                <TextField label="Theme Light" defaultValue={sptheme.themeLight} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeLight: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "14", color: sptheme.themeLight }]} />
                <TextField label="Neutral Light" defaultValue={sptheme.neutralLight} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralLight: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "15", color: sptheme.neutralLight }]} />
                <TextField label="Theme Lighter" defaultValue={sptheme.themeLighter} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeLighter: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "16", color: sptheme.themeLighter }]} />
                <TextField label="Neutral Lighter" defaultValue={sptheme.neutralLighter} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralLighter: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "17", color: sptheme.neutralLighter }]} />
                <TextField label="Neutral Lighter Alt" defaultValue={sptheme.neutralLighterAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, neutralLighterAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "18", color: sptheme.neutralLighterAlt }]} />
                <TextField label="Theme Lighter Alt" defaultValue={sptheme.themeLighterAlt} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, themeLighterAlt: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "19", color: sptheme.themeLighterAlt }]} />
                <TextField label="Black" defaultValue={sptheme.black} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, black: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "20", color: sptheme.black }]} />
                <TextField label="White" defaultValue={sptheme.white} onChange={(e, newValue) => newValue.length > 6 && setTheme({ ...sptheme, white: newValue })} />
                <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: "21", color: sptheme.white }]} />
            </Stack>
        </Stack>
        <PrimaryButton text="Enregistrer les modifications" onClick={_handleSave} />
        {editStatus == EditStatus.success && (
          <MessageBar
            // Setting this to error, blocked, or severeWarning automatically sets the role to "alert"
            messageBarType={MessageBarType.success}
            // Or you could set the role manually, IF an alert role is appropriate for the message
            // role="alert"
          >
            The update successfully.
          </MessageBar>
        )}
    </Dialog>
}

export default ThemeEditForm