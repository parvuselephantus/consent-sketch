import React from 'react';
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
export declare const ConfigSketchProvider: ({ children }: any) => import("react/jsx-runtime").JSX.Element;
export declare const useConsentSketchConfig: () => ConsentSketchConfig;
