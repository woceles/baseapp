import * as React from 'react';
declare enum HideMode {
    hide = "hide",
    unmount = "unmount"
}
declare type OnTabChangeCallback = (index: number, label?: string) => void;
interface Tab {
    content: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
    label: string;
}
interface TabPanelProps {
    /**
     * List of tabs to be rendered
     */
    panels: Tab[];
    /**
     * Determines whether tabs should be full container width
     * @default false
     */
    fixed?: boolean;
    /**
     * Tab change mode:
     * `hide` mode will mount but hide inactive tabs changing `display` css
     * property of tab content to `none`.
     * `unmount` mode will not mount the tab content of inactive tabs.
     * @default hide
     */
    hideMode?: HideMode;
    /**
     * Callback which is called when currently active tab is changed
     */
    onTabChange?: OnTabChangeCallback;
}
interface TabPanelState {
    currentTabIndex: number;
}
/**
 * Component for switching between different tabs on one page.
 */
declare class TabPanel extends React.Component<TabPanelProps, TabPanelState> {
    static defaultProps: {
        hideMode: HideMode;
    };
    state: {
        currentTabIndex: number;
    };
    render(): JSX.Element;
    private renderTabPanel;
    private renderTabContent;
    private createOnTabChangeHandler;
}
export { HideMode, OnTabChangeCallback, Tab, TabPanel, TabPanelProps, TabPanelState, };
