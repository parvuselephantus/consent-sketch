import { ConfigSketchProvider } from './component/ConsentSketchProvider';
import { CookieDialog } from './component/CookieDialog';

function App() {
    return <ConfigSketchProvider>
        <CookieDialog></CookieDialog>
    </ConfigSketchProvider>
}

export default App;
