import { ActionButton, IIconProps, IStackProps, MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { Dialog, DialogType, SwatchColorPicker } from 'office-ui-fabric-react';
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

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Edit ',
    subText: 'Do you want to send this message without a subject?',
};

interface IThemeNewFormProps extends IThemeFormProps {
    dismiss: any;
}

enum NewStatus {
    idle,
    success,
    error
}

const ThemeNewForm: React.FC<IThemeNewFormProps> = ({ children, service, dismiss }) => {
    const defautTheme = {
        "themePrimary": "#0078d4",
        "themeLighterAlt": "#eff6fc",
        "themeLighter": "#deecf9",
        "themeLight": "#c7e0f4",
        "themeTertiary": "#71afe5",
        "themeSecondary": "#2b88d8",
        "themeDarkAlt": "#106ebe",
        "themeDark": "#005a9e",
        "themeDarker": "#004578",
        "neutralLighterAlt": "#faf9f8",
        "neutralLighter": "#f3f2f1",
        "neutralLight": "#edebe9",
        "neutralQuaternaryAlt": "#e1dfdd",
        "neutralQuaternary": "#d0d0d0",
        "neutralTertiaryAlt": "#c8c6c4",
        "neutralTertiary": "#a19f9d",
        "neutralSecondary": "#605e5c",
        "neutralPrimaryAlt": "#3b3a39",
        "neutralPrimary": "#323130",
        "neutralDark": "#201f1e",
        "black": "#000000",
        "white": "#ffffff"
    }
    const [themetitle, setThemeTitle] = React.useState<string>()
    const [displayJSON, showJSON] = React.useState<boolean>()
    const [sptheme, setTheme] = React.useState<Palette>(defautTheme)
    const [newStatus, SetNewStatus] = React.useState<NewStatus>(NewStatus.idle);
    const [errorMessage, SetErrorMessage] = React.useState<string>("");
    const stackTokens = { childrenGap: 20 }
    const colorIcon: IIconProps = { iconName: 'Color' };


    function _showJSON() {
        showJSON(displayJSON ? false : true)
    }

    function _handleSave() {
        let t: Theme = { name: themetitle, palette: sptheme, isInverted: false }
        service.CreateTheme(t).then(success => {
            dismiss();
        })
    }

    return <Dialog onDismiss={dismiss} hidden={sptheme ? false : true} modalProps={modelProps} minWidth={600}>
        <TextField label="Theme Name" defaultValue={""} width={250} onChange={(e, newValue) => setThemeTitle(newValue)} />
        <br />
        <ActionButton iconProps={colorIcon} allowDisabledFocus disabled={false} onClick={_showJSON}>
            JSON
        </ActionButton>
        {displayJSON && <TextField multiline rows={20} label="Theme JSON" defaultValue={JSON.stringify(sptheme, undefined, 4)} width={250} onChange={(e, newValue) => setTheme(JSON.parse(newValue))} />}
        <br />
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
        {newStatus == NewStatus.success && (
            <MessageBar
                messageBarType={MessageBarType.success}
            >
                The update successfully.
            </MessageBar>
        )}
    </Dialog>
}

export default ThemeNewForm