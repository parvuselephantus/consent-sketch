import React from "react";
export interface CookieDefinition {
    key: string;
    title: string;
    length?: number;
    description?: JSX.Element;
    required?: boolean;
}
declare const useConsentSketch: () => {
    cookies: CookieDefinition[];
    setCookies: React.Dispatch<React.SetStateAction<CookieDefinition[]>>;
    isCookieAccepted(name: string): boolean;
    acceptCookiesAndStore(name: string[]): void;
    acceptAllCookiesAndStore(): void;
    rejectAllCookiesAndStore(): void;
    showConsentDialog: boolean;
    setShowConsentDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showCustomize: boolean;
    setShowCustomize: React.Dispatch<React.SetStateAction<boolean>>;
    generalCookieKey: string;
};
export default useConsentSketch;
