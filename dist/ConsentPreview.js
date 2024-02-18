import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { ConfigSketchProvider, useConsentSketchConfig } from "./component/ConsentSketchProvider";
import { CookieDialog } from "./component/CookieDialog";
function ConsentPreview() {
    let Contexted = () => {
        let { setLastConsentChanges } = useConsentSketchConfig();
        React.useEffect(() => {
            setLastConsentChanges(new Date(2024, 1, 18, 0, 0, 0));
        }, [setLastConsentChanges]);
        return _jsx(CookieDialog, { configContent: "Content" });
    };
    return _jsx(ConfigSketchProvider, { children: _jsx(Contexted, {}) });
}
export default ConsentPreview;
