import {ReactComponent as MSWLogo} from '../public/mock-service-worker.svg';
import './App.css';
import {BrowserMockTesting} from './ui/browser-mock-testing/browser-mock-testing';

function App() {
    return (
        <>
            <div>
                <a href='https://mswjs.io/docs' target='_blank'>
                    <MSWLogo className='logo react' aria-label='MSW logo' />
                </a>
            </div>
            <h1>MSW</h1>
            <div className='card'>
                <BrowserMockTesting />
            </div>
        </>
    );
}

export default App;
