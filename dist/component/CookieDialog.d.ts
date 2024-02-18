/// <reference types="react" />
import './CookieDialog.css';
interface CookieDialogProps {
    cssClass?: string;
    dialogContent?: string | JSX.Element;
    configContent: string | JSX.Element;
    acceptAllBtn?: string;
    acceptSomeBtn?: string;
    rejectBtn?: string;
    closeSettingsBtn?: string;
    acceptSelectedBtn?: string;
    children?: JSX.Element[];
    forceDisplay?: boolean;
}
export declare const CookieDialog: ({ cssClass, dialogContent, configContent, children, acceptAllBtn, acceptSomeBtn, rejectBtn, closeSettingsBtn, acceptSelectedBtn, forceDisplay }: CookieDialogProps) => import("react/jsx-runtime").JSX.Element;
export {};
