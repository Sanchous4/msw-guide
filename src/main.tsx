import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {browserWorker} from './mocks/browser.ts';

declare global {
    interface Window {
        __mswStop: () => void;
    }
}

const prepareMockServiceWorker = async () => {
    if (import.meta.env.MODE === 'development') {
        //* after worker activation u will get console.log: [MSW] Mocking enabled
        //* waitUntilReady - default true (don't intercept requests until initialization gets ready)
        await browserWorker.start({waitUntilReady: true});

        //* Write the stop method on the window
        //* to access during runtime.
        window.__mswStop = browserWorker.stop;
    }
};

prepareMockServiceWorker().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
