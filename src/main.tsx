import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {browserWorker} from './mocks/browser.ts';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

declare global {
    interface Window {
        __mswStop: () => void;
    }
}

const prepareMockServiceWorker = async () => {
    if (import.meta.env.MODE === 'development') {
        //* after worker activation u will get console.log: [MSW] Mocking enabled

        await browserWorker.start({
            //* defers any application requests that happened while Service Worker was activating.
            waitUntilReady: true,
            //* disable logging
            quiet: true,
            serviceWorker: {
                //* points to the custom location of the Service Worker file.
                // url: '/assets/mockServiceWorker.js'
                //
                //* only intercept requests from pages under this path.
                // scope: '/product'
            },
            //* findWorker returns boolean value that indicate what worker should be used
            //* mockServiceWorkerUrl - expected url (http://localhost:3000/mockServiceWorker.js)
            //* scriptUrl - current url (http://localhost:3000/service-worker.js)
            //! it returns the first found worker
            findWorker(scriptUrl, mockServiceWorkerUrl) {
                const currentUrl = new URL(scriptUrl).hostname;
                const expectedUrl = new URL(mockServiceWorkerUrl).hostname;

                return currentUrl === expectedUrl;
            },

            //* by default msw warns you and bypass the unhandled requests
            // onUnhandledRequest filed can be string as 'bypass' | 'warn' | 'error'
            // Or it can be callback as below

            onUnhandledRequest(req, print) {
                console.warn(
                    'Found an unhandled %s request to %s',
                    req.method,
                    req.url.href
                );
                // or
                print.warning();
            },
        });

        //* write the stop method on the window
        //* to access during runtime.
        //*
        //* Sequence of stopping worker
        //* if user calls the methods it will stop worker for the current page/session (depends on navigation method)
        //* if page reloads the worker will be restarted for the session
        window.__mswStop = browserWorker.stop;
    }
};

//* Sequence of launching worker
//* 1) Look for existing worker and kill it
//* 2) Check out hash of config file if it is no corrupted don't recreate and start with this config
//* 3) Track all clients that uses the worker with map if there are no clients then deactivate itself

export const queryClient = new QueryClient();

prepareMockServiceWorker().then(() => {
    return ReactDOM.createRoot(document.getElementById('root')!).render(
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </QueryClientProvider>
    );
});
