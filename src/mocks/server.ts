//* for Node
import {setupServer} from 'msw/node';
import {handlers} from './handlers';
import {rest} from 'msw';

// This configures a request mocking server with the given request handlers for server part.
export const server = setupServer(...handlers);

// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
    worker: server,
    rest,
};
