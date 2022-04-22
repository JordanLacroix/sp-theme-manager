import { ActionButton, IIconProps, IStackProps, Stack } from "@microsoft/office-ui-fabric-react-bundle";
import {
    Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel
} from "@pnp/spfx-controls-react/lib/AccessibleAccordion";
import { SwatchColorPicker } from "office-ui-fabric-react";
import * as React from "react";
import { Theme } from "../../models/Theme";
import { IThemeFormProps } from "../IThemeFormProps";
import ThemeEditForm from "../ThemeEditForm/ThemeEditForm";
import ThemeNewForm from "../ThemeNewForm/ThemeNewForm";

interface IThemeListFormProps extends IThemeFormProps {};

const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

const ThemeListForm: React.FC<IThemeListFormProps> = ({ children, service }) => {
    const [themes, setThemes] = React.useState([]);
    const [displayNewForm, showNewForm] = React.useState(false);
    const [themeSelected, selectTheme] = React.useState<Theme>();
    const stackTokens = { childrenGap: 20 }
    const colorIcon: IIconProps = { iconName: 'Color' };

    function _handleDeleteTheme(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.currentTarget.getAttribute("value"));
        service.DeleteTheme(e.currentTarget.getAttribute("value")).then(success => {
            success && _getThemes();
        })
    }
    function _handleEditTheme(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e.currentTarget.getAttribute("value"));
        let selectedTheme = themes.filter(t => t.name == e.currentTarget.getAttribute("value"))[0] as Theme
        selectTheme(selectedTheme);
    }
    function _handleApplyTheme(e: React.MouseEvent<HTMLSpanElement>) {
        let selectedTheme = themes.filter(t => t.name == e.currentTarget.getAttribute("value"))[0] as Theme
        service.ApplyTheme(selectedTheme).then(success => {
            success && window.location.reload()
        })
    }

    function _getThemes() {
        service.GetThemes().then((themes: Theme[]) => {
            setThemes(themes);
        })
    }

    function _clearThemeSelected() {
        selectTheme(undefined);
        _getThemes()
    }

    function _toggleNewForm() {
        console.log(displayNewForm)
        showNewForm(displayNewForm ? false : true);
        _getThemes();
    }

    function _isOdd(number: number) {
        return number % 2;
    }

    React.useEffect(() => {
        if (themes.length == 0) {
            _getThemes();
        }
    })

    return <><ActionButton iconProps={colorIcon} allowDisabledFocus disabled={false} onClick={_toggleNewForm}>
        Create Theme
    </ActionButton>
    {displayNewForm && <ThemeNewForm service={service} dismiss={_toggleNewForm} />}
    <Accordion allowZeroExpanded>
            {themes && themes.map((theme: Theme) => {
                return <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {theme.name}
                            <ActionButton iconProps={colorIcon} allowDisabledFocus disabled={false} value={theme.name} onClick={_handleApplyTheme}>
                                Apply
                            </ActionButton>
                            <ActionButton iconProps={colorIcon} allowDisabledFocus disabled={false} value={theme.name} onClick={_handleEditTheme}>
                                Edit
                            </ActionButton>
                            <ActionButton iconProps={colorIcon} allowDisabledFocus disabled={false} value={theme.name} onClick={_handleDeleteTheme}>
                                Remove
                            </ActionButton>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Stack horizontal tokens={stackTokens} >
                            <Stack {...columnProps}>
                                {!themeSelected && Object.keys(theme.palette).map((k, i) => {

                                    return _isOdd(i) && <><div>{k} <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: i.toString(), color: theme.palette[k] }]} /> {theme.palette[k]}</div></>
                                })}

                            </Stack>
                            <Stack {...columnProps}>
                                {!themeSelected && Object.keys(theme.palette).map((k, i) => {

                                    return !_isOdd(i) && <><div>{k} <SwatchColorPicker columnCount={1} cellHeight={35} cellWidth={35} cellShape={'square'} colorCells={[{ id: i.toString(), color: theme.palette[k] }]} /> {theme.palette[k]}</div></>
                                })}

                            </Stack>
                        </Stack>
                        {themeSelected && <ThemeEditForm service={service} theme={themeSelected} dismiss={_clearThemeSelected} />}
                        
                    </AccordionItemPanel>
                </AccordionItem>
            })}
        </Accordion></>
}

export default ThemeListForm;