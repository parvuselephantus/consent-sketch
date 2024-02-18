//export {};
import React, { createContext, useContext } from 'react';
import { CookieDefinition } from './ConsentSketch';

export interface ConsentSketchConfig {
    showConsentDialog: boolean;
    setShowConsentDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showCustomize: boolean;
    setShowCustomize: React.Dispatch<React.SetStateAction<boolean>>;
    generalCookieKey: string;
    setGeneralCookieKey: React.Dispatch<React.SetStateAction<string>>;
    userConsentReviewDateCookieName: string;
    setUserConsentReviewDateCookieName: React.Dispatch<React.SetStateAction<string>>;
    cookies: CookieDefinition[];
    setCookies: React.Dispatch<React.SetStateAction<CookieDefinition[]>>;
    lastConsentChanges: Date;
    setLastConsentChanges: React.Dispatch<React.SetStateAction<Date>>;
    lastUserConsentReview: Date;
    setLastUserConsentReview: React.Dispatch<React.SetStateAction<Date>>;
}

const ConfigSketchContext = createContext<ConsentSketchConfig | undefined>(undefined);

export const ConfigSketchProvider = ({children}: any) => {
    let [showConsentDialog, setShowConsentDialog] = React.useState<boolean>(true);
    let [showCustomize, setShowCustomize] = React.useState<boolean>(false);
    let [generalCookieKey, setGeneralCookieKey] = React.useState<string>("general");
    let [userConsentReviewDateCookieName, setUserConsentReviewDateCookieName] = React.useState<string>("generalDate");
    let [cookies, setCookies] = React.useState<CookieDefinition[]>([{title:"Concents and Privacy Policy", key:"general", required: true}, {title:"Analytics", key:"analytics"}]);
    let [lastConsentChanges, setLastConsentChanges] = React.useState<Date>(new Date(0));
    let [lastUserConsentReview, setLastUserConsentReview] = React.useState<Date>(new Date());

    let config: ConsentSketchConfig = {
        showConsentDialog, setShowConsentDialog,
        showCustomize, setShowCustomize,
        generalCookieKey, setGeneralCookieKey,
        cookies, setCookies,
        lastConsentChanges, setLastConsentChanges,
        lastUserConsentReview, setLastUserConsentReview,
        userConsentReviewDateCookieName, setUserConsentReviewDateCookieName,
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