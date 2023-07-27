import {SetupWorker, rest, setupWorker} from 'msw';
import {setupServer} from 'msw/node';

declare global {
    interface Window {
        msw: {
            worker:
                | ReturnType<typeof setupServer>
                | ReturnType<typeof setupWorker>;
            rest: typeof rest;
        };
    }
}
