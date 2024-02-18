import React from "react";
import { ConfigSketchProvider, useConsentSketchConfig } from "./component/ConsentSketchProvider";
import { CookieDialog } from "./component/CookieDialog";

function ConsentPreview() {
    let Contexted = () => {
        let {
            setLastConsentChanges
        } = useConsentSketchConfig();

        React.useEffect(() => {
            setLastConsentChanges(new Date(2024, 1, 18, 0, 0, 0));
        }, [setLastConsentChanges]);

        return <CookieDialog configContent={"Content"}/>;
    }

    return <ConfigSketchProvider>
        <Contexted></Contexted>
    </ConfigSketchProvider>
}
export default ConsentPreview;