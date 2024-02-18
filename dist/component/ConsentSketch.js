import React from "react";
import { useConsentSketchConfig } from "./ConsentSketchProvider";
const useConsentSketch = () => {
    const { generalCookieKey, cookies, setCookies, showConsentDialog, setShowConsentDialog, showCustomize, setShowCustomize, userConsentReviewDateCookieName, lastConsentChanges, lastUserConsentReview, setLastUserConsentReview } = useConsentSketchConfig();
    /**
     * Consent map - keys are cookies names, values are booleans
     */
    const [consents, setConsents] = React.useState({});
    React.useEffect(() => {
        let consentDateVal = getCookie(userConsentReviewDateCookieName);
        let userConsentDate = undefined;
        if (consentDateVal != null) {
            userConsentDate = new Date(consentDateVal);
            if (lastUserConsentReview.getTime() !== userConsentDate.getTime()) {
                setLastUserConsentReview(userConsentDate);
            }
        }
        let consent = getCookie(generalCookieKey);
        if (consent !== null) {
            let consentsFromCookie = consent.split(",");
            let userConsentValid = userConsentDate !== undefined && userConsentDate.getTime() >= lastConsentChanges.getTime();
            let newConsents = {};
            for (let i = 0; i < consentsFromCookie.length; i++) {
                newConsents[consentsFromCookie[i]] = userConsentValid;
            }
            setConsents(newConsents);
            setShowConsentDialog(!userConsentValid);
        }
    }, [generalCookieKey, lastConsentChanges, lastUserConsentReview, setLastUserConsentReview, setShowConsentDialog, userConsentReviewDateCookieName]);
    const getCookieDefinition = (key) => {
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].key === key) {
                return cookies[i];
            }
        }
        throw new Error("No cookie having key '" + key + "' defined");
    };
    const setGeneralCookie = (newConsents) => {
        var _a, _b;
        let def = getCookieDefinition(generalCookieKey);
        let curDate = new Date();
        setLastUserConsentReview(curDate);
        setCookie(generalCookieKey, Object.keys(newConsents).join(","), (_a = def.length) !== null && _a !== void 0 ? _a : 365);
        setCookie(userConsentReviewDateCookieName, curDate.toUTCString(), (_b = def.length) !== null && _b !== void 0 ? _b : 365);
    };
    const acceptCookiesAndStore = (accept) => {
        if (accept.indexOf(generalCookieKey) === -1) {
            rejectAllCookies();
        }
        else {
            let newConsents = {};
            for (let i = 0; i < accept.length; i++) {
                newConsents[accept[i]] = true;
            }
            setConsents(newConsents);
            setGeneralCookie(newConsents);
        }
    };
    const isCookieAccepted = (name) => {
        return consents[name] === true;
    };
    const acceptAllCookies = () => {
        let accept = {};
        for (let i = 0; i < cookies.length; i++) {
            let name = cookies[i].key;
            accept[name] = true;
        }
        setConsents(accept);
        setGeneralCookie(accept);
    };
    const rejectAllCookies = () => {
        setConsents({});
        deleteAllCookies();
    };
    const setCookie = (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toDateString();
        }
        document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + ";SameSite=Lax;path=/";
    };
    const getCookie = (name) => {
        var nameEQ = name + "=";
        var cookiesSplit = document.cookie.split(';');
        for (var i = 0; i < cookiesSplit.length; i++) {
            var c = cookiesSplit[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    };
    function deleteAllCookies() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + "=;SameSite=Lax;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    return {
        showConsentDialog, setShowConsentDialog,
        showCustomize, setShowCustomize,
        cookies, setCookies,
        generalCookieKey,
        isCookieAccepted,
        acceptCookiesAndStore,
        acceptAllCookiesAndStore: acceptAllCookies,
        rejectAllCookiesAndStore: rejectAllCookies,
    };
};
export default useConsentSketch;
