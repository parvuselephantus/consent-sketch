import { jsx as _jsx } from "react/jsx-runtime";
//export {};
import React, { createContext, useContext } from 'react';
const ConfigSketchContext = createContext(undefined);
export const ConfigSketchProvider = ({ children }) => {
    let [showConsentDialog, setShowConsentDialog] = React.useState(true);
    let [showCustomize, setShowCustomize] = React.useState(false);
    let [generalCookieKey, setGeneralCookieKey] = React.useState("general");
    let [userConsentReviewDateCookieName, setUserConsentReviewDateCookieName] = React.useState("generalDate");
    let [cookies, setCookies] = React.useState([{ title: "Concents and Privacy Policy", key: "general", required: true }, { title: "Analytics", key: "analytics" }]);
    let [lastConsentChanges, setLastConsentChanges] = React.useState(new Date(0));
    let [lastUserConsentReview, setLastUserConsentReview] = React.useState(new Date());
    let config = {
        showConsentDialog, setShowConsentDialog,
        showCustomize, setShowCustomize,
        generalCookieKey, setGeneralCookieKey,
        cookies, setCookies,
        lastConsentChanges, setLastConsentChanges,
        lastUserConsentReview, setLastUserConsentReview,
        userConsentReviewDateCookieName, setUserConsentReviewDateCookieName,
    };
    return (_jsx(ConfigSketchContext.Provider, Object.assign({ value: config }, { children: children })));
};
export const useConsentSketchConfig = () => {
    const config = useContext(ConfigSketchContext);
    if (!config) {
        throw new Error('useConsentSketchConfig must be used within ConfigSketchProvider');
    }
    return config;
};
