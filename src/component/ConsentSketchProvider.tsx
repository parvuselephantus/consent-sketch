import React, { createContext, useContext } from 'react';
import { CookieDefinition } from './ConsentSketch';

interface ConsentSketchConfig {
    showConsentDialog: boolean;
    setShowConsentDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showCustomize: boolean;
    setShowCustomize: React.Dispatch<React.SetStateAction<boolean>>;
    generalCookieKey: string;
    setGeneralCookieKey: React.Dispatch<React.SetStateAction<string>>;
    cookies: CookieDefinition[];
    setCookies: React.Dispatch<React.SetStateAction<CookieDefinition[]>>;
}

const ConfigSketchContext = createContext<ConsentSketchConfig | undefined>(undefined);

export const ConfigSketchProvider = ({children}: any) => {
    let [showConsentDialog, setShowConsentDialog] = React.useState<boolean>(true);
    let [showCustomize, setShowCustomize] = React.useState<boolean>(false);
    let [generalCookieKey, setGeneralCookieKey] = React.useState<string>("general");
    let [cookies, setCookies] = React.useState<CookieDefinition[]>([{title:"General", key:"general"}]);

    let config: ConsentSketchConfig = {
        showConsentDialog, setShowConsentDialog,
        showCustomize, setShowCustomize,
        generalCookieKey, setGeneralCookieKey,
        cookies, setCookies
    }

    return (
        <ConfigSketchContext.Provider value={config}>
            {children}
        </ConfigSketchContext.Provider>
    );
};

export const useConsentSketchConfig = (): ConsentSketchConfig => {
    const config = useContext(ConfigSketchContext);
    if (!config) {
        throw new Error('useConsentSketchConfig must be used within ConfigSketchProvider');
    }
    return config;
};