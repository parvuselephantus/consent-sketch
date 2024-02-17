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
        forceDisplay = false}: CookieDialogProps) => {

    let CookieDialogHeader = () => {
        const {
            showConsentDialog,
            setShowConsentDialog,
            setShowCustomize,
            acceptAllCookies,
            rejectAllCookies,
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
            setShowConsentDialog,
            showCustomize,
            setShowCustomize,
            cookies,
            acceptAllCookies,
            rejectAllCookies,
            isCookieAccepted,
            acceptCookie,
            rejectCookie,
            generalCookieKey,
        } = useCookiesConsent();

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
                                onChange={e => e.target.checked ? acceptCookie(cookie.key) : rejectCookie(cookie.key)}
                                checked={isCookieAccepted(cookie.key)}
                                disabled={cookie.key !== generalCookieKey && !isCookieAccepted(generalCookieKey)}
                            ></input>
                            <b>{cookie.title}</b>
                            {cookie.description && <>{cookie.description}</>}
                        </label>                        
                    </div>)}
                    <div className="buttonFooter">
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