import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import useCookiesConsent from "./ConsentSketch";
import './CookieDialog.css';
export const CookieDialog = ({ cssClass, dialogContent = "We need your agreement to store data in cookies, to have page working properly", configContent = "Please select which cookies we can use", children, acceptAllBtn = "Accept all", acceptSomeBtn = "More...", rejectBtn = "Reject all", closeSettingsBtn = "Close settings", acceptSelectedBtn = "Accept selected", forceDisplay = false }) => {
    let CookieDialogHeader = () => {
        const { showConsentDialog, setShowConsentDialog, setShowCustomize, acceptAllCookiesAndStore: acceptAllCookies, rejectAllCookiesAndStore: rejectAllCookies, } = useCookiesConsent();
        const closeDialog = (e) => {
            e.preventDefault();
            setShowConsentDialog(false);
        };
        return (_jsx(_Fragment, { children: (showConsentDialog || forceDisplay) &&
                _jsxs("div", Object.assign({ className: `ConsentSketchDialog ${cssClass !== null && cssClass !== void 0 ? cssClass : ""}` }, { children: [_jsx("div", Object.assign({ className: 'ConsentSketchBody' }, { children: dialogContent })), _jsxs("div", Object.assign({ className: 'ConsentSketchActions' }, { children: [children, _jsx("button", Object.assign({ onClick: (e) => { acceptAllCookies(); closeDialog(e); } }, { children: acceptAllBtn })), _jsx("button", Object.assign({ onClick: (e) => { setShowCustomize(true); e.preventDefault(); } }, { children: acceptSomeBtn })), _jsx("button", Object.assign({ onClick: (e) => { rejectAllCookies(); closeDialog(e); } }, { children: rejectBtn }))] }))] })) }));
    };
    let CookieCustomizeImpl = () => {
        const { generalCookieKey, setShowConsentDialog, showCustomize, setShowCustomize, cookies, acceptAllCookiesAndStore: acceptAllCookies, rejectAllCookiesAndStore: rejectAllCookies, isCookieAccepted, acceptCookiesAndStore, } = useCookiesConsent();
        let [selection, setSelection] = React.useState({ [generalCookieKey]: true });
        React.useEffect(() => {
            let curSelection = {};
            for (let i = 0; i < cookies.length; i++) {
                let c = cookies[i];
                curSelection[c.key] = c.required || isCookieAccepted(c.key);
            }
            setSelection(curSelection);
        }, [cookies]);
        let acceptSelected = () => {
            let toStore = [];
            for (let i = 0; i < cookies.length; i++) {
                let c = cookies[i];
                if (selection[c.key]) {
                    toStore.push(c.key);
                }
            }
            acceptCookiesAndStore(toStore);
        };
        const closeDialog = (e) => {
            e.preventDefault();
            setShowCustomize(false);
            setShowConsentDialog(false);
        };
        return (_jsx(_Fragment, { children: showCustomize &&
                _jsxs("div", Object.assign({ className: `ConsentSketchCustomize ${cssClass !== null && cssClass !== void 0 ? cssClass : ""}` }, { children: [configContent, cookies.map((cookie) => {
                            var _a;
                            return _jsx("div", Object.assign({ className: "cookieItem" }, { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", onChange: e => setSelection(Object.assign(Object.assign({}, selection), { [cookie.key]: !selection[cookie.key] })), checked: (_a = selection[cookie.key]) !== null && _a !== void 0 ? _a : false, disabled: cookie.required }), _jsx("b", { children: cookie.title }), cookie.description && _jsx(_Fragment, { children: cookie.description })] }) }), "cookie_" + cookie.key);
                        }), _jsxs("div", Object.assign({ className: "buttonFooter" }, { children: [_jsx("button", Object.assign({ onClick: (e) => { acceptSelected(); closeDialog(e); } }, { children: acceptSelectedBtn })), _jsx("button", Object.assign({ onClick: (e) => { acceptAllCookies(); closeDialog(e); } }, { children: acceptAllBtn })), _jsx("button", Object.assign({ onClick: (e) => { rejectAllCookies(); closeDialog(e); } }, { children: rejectBtn })), _jsx("button", Object.assign({ onClick: (e) => { e.preventDefault(); setShowCustomize(false); } }, { children: closeSettingsBtn }))] }))] })) }));
    };
    return _jsxs(_Fragment, { children: [_jsx(CookieDialogHeader, {}), _jsx(CookieCustomizeImpl, {})] });
};
