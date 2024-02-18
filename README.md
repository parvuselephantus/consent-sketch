# consent-sketch

This is sketch - that means I have spent minimum time to have it just working. That makes it guaranteed to have bugs, and to have API altered with time. It works for me, but may not work for you. You are allowed to test and improve it or even contact author if improvement/fix needed.

The code is here: https://github.com/parvuselephantus/consent-sketch

## Features

This is sketch of consent library. It's aim is to handle **React Typescript** multiple consents - some required to have service working others not.
Features:
- Handle multiple consents (and their keys, titles, descriptions, ...)
- Have Context provider, to check which conesents have been accepted by user anywhere in the code
- Have user consents restarted if something changed recently
- You can implement your own consent popup and configuration window (or just use the default one) - styling including
- Accept partial/all/reject buttons

## Quick Start

install with npm:
   npm i consent-sketch

Include in your project in 3 steps:
1. Wrap modules you are going to use consent-sketch withing ConfigSketchProvider. It is recommended to wrap whole app in App.tsx in <ConfigSketchProvider>. You will need to import it:

    import { ConfigSketchProvider } from 'consent-sketch';
    
2. Init the library. Set the list of cookies, init the last date of modification of consents (so if user applied it before, consent will popup again)
    
    import { useConsentSketchConfig } from "consent-sketch";
    import useConsentSketch from "consent-sketch/dist/component/ConsentSketch";
    
...

    let {
        setLastConsentChanges
    } = useConsentSketchConfig();

    React.useEffect(() => {
        //17th Feb 2024
        setLastConsentChanges(new Date(2024, 1, 17, 0, 0, 0));

        //You may not call this one:
        setCookies([
            {title: "Main Consent", key: "general", required: true, description: <p>You need to accept it to have it working</p>},
            {title: "Comfort", key: "comfort", description: <p>This one is optional, but you may accept it for your comfort of usage of our service</p>},
        ]);
    }, [setLastConsentChanges]);

3. Show the Consent:

    import { CookieDialog } from "consent-sketch";

...

    <CookieDialog
        dialogContent={<>(Optional) This is consent dialog popup message</>}
        configContent="This is config window message"
        // If you want to have popup visible for debug reason - here it is:
        // forceDisplay={true}
    ></CookieDialog>

And it should work. Have fun, if you see an area for improvement I will be happy to learn it.

## Other API's

It's all in the code, but let me put that here too. Main entry point for any actions should be:

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

Just call:

    let {<needed API's} = useConsentSketch();

And you should have all you need. Made my best to make it intuitive in short time.

## Custom GUI 

If you want to have your own implementation of GUI, please have a look at
[CookieDialog code](https://github.com/parvuselephantus/consent-sketch/blob/main/src/component/CookieDialog.tsx). Hopefully the code of Dialog and Settings window is simple enough, to enable you copying it.

