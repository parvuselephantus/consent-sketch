import React from "react";
import useCookiesConsent, { CookieDefinition } from "./ConsentSketch";
import './CookieDialog.css';

interface CookieDialogProps {
    cssClass?: string,
    dialogContent?: string | JSX.Element,
    configContent: string | JSX.Element,

    acceptAllBtn?: string,
    acceptSomeBtn?: string,
    rejectBtn?: string,
    closeSettingsBtn?: string,
    acceptSelectedBtn?: string,

    children?: JSX.Element[],
    forceDisplay?: boolean;
}
export const CookieDialog = ({
        cssClass,
        dialogContent = "We need your agreement to store data in cookies, to have page working properly",
        configContent = "Please select which cookies we can use",
        children,
        acceptAllBtn = "Accept all",
        acceptSomeBtn = "More...",
        rejectBtn = "Reject all",
        closeSettingsBtn = "Close settings",
        acceptSelectedBtn = "Accept selected",
        forceDisplay = false}: CookieDialogProps) => {
    
    let CookieDialogHeader = () => {
        const {
            showConsentDialog,
            setShowConsentDialog,
            setShowCustomize,
            acceptAllCookiesAndStore: acceptAllCookies,
            rejectAllCookiesAndStore: rejectAllCookies,
        } = useCookiesConsent();

        const closeDialog = (e: any) => {
            e.preventDefault();
            setShowConsentDialog(false);
        }

        return (<>
            {(showConsentDialog || forceDisplay) &&
                <div className={`ConsentSketchDialog ${cssClass ?? ""}`}>
                    <div className='ConsentSketchBody'>{dialogContent}</div>
                    <div className='ConsentSketchActions'>
                        {children}
                        <button onClick={(e) => {acceptAllCookies(); closeDialog(e)}}>{acceptAllBtn}</button>
                        <button onClick={(e) => {setShowCustomize(true); e.preventDefault();}}>{acceptSomeBtn}</button>
                        <button onClick={(e) => {rejectAllCookies(); closeDialog(e)}}>{rejectBtn}</button>
                    </div>
                </div>
            }
        </>);
    }

    let CookieCustomizeImpl = () => {
        const {
            generalCookieKey,
            setShowConsentDialog,
            showCustomize,
            setShowCustomize,
            cookies,
            acceptAllCookiesAndStore: acceptAllCookies,
            rejectAllCookiesAndStore: rejectAllCookies,
            isCookieAccepted,
            acceptCookiesAndStore,
        } = useCookiesConsent();

        let [selection, setSelection] = React.useState<any>({[generalCookieKey]: true});

        React.useEffect(() => {
            let curSelection: any = {};
            for (let i = 0; i < cookies.length; i++) {
                let c = cookies[i];
                curSelection[c.key] = c.required || isCookieAccepted(c.key);
            }
            setSelection(curSelection);
        }, [cookies]);
    
        let acceptSelected = () => {
            let toStore: string[] = [];
            for (let i = 0; i < cookies.length; i++) {
                let c = cookies[i];
                if (selection[c.key]) {
                    toStore.push(c.key);
                }
            }
            acceptCookiesAndStore(toStore);
        }

        const closeDialog = (e: any) => {
            e.preventDefault();
            setShowCustomize(false);
            setShowConsentDialog(false);
        }

        return (<>
            {showCustomize &&
                <div className={`ConsentSketchCustomize ${cssClass ?? ""}`}>
                    {configContent}
                    {cookies.map((cookie: CookieDefinition) => <div className="cookieItem" key={"cookie_" + cookie.key}>
                        <label>
                            <input 
                                type="checkbox"
                                onChange={e => setSelection({...selection, [cookie.key]: !selection[cookie.key]})}
                                checked={selection[cookie.key] ?? false}
                                disabled={cookie.required}
                            ></input>
                            <b>{cookie.title}</b>
                            {cookie.description && <>{cookie.description}</>}
                        </label>                        
                    </div>)}
                    <div className="buttonFooter">
                        <button onClick={(e) => {acceptSelected(); closeDialog(e)}}>{acceptSelectedBtn}</button>
                        <button onClick={(e) => {acceptAllCookies(); closeDialog(e)}}>{acceptAllBtn}</button>
                        <button onClick={(e) => {rejectAllCookies(); closeDialog(e)}}>{rejectBtn}</button>
                        <button onClick={(e) => {e.preventDefault(); setShowCustomize(false);}}>{closeSettingsBtn}</button>
                    </div>
                </div>
            }
        </>);
    }

    return <>
        <CookieDialogHeader></CookieDialogHeader>
        <CookieCustomizeImpl></CookieCustomizeImpl>
    </>
}