import { jsx as _jsx } from "react/jsx-runtime";
import { ConfigSketchProvider } from './component/ConsentSketchProvider';
import { CookieDialog } from './component/CookieDialog';
function App() {
    return _jsx(ConfigSketchProvider, { children: _jsx(CookieDialog, {}) });
}
export default App;
