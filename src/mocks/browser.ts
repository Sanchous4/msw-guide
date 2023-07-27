//* for Browser
import {setupWorker} from 'msw';
import {handlers} from './handlers';

// This configures a Service Worker with the given request handlers for client part.
export const browserWorker = setupWorker(...handlers);

//!  self.registration.unregister() - remove it if create-react-app <= 3 version (public\mockServiceWorker.js)
//* in your src/index.js file. Create React App unregisters all Service Workers by default, which would also unregister the mock Service Worker, resulting into broken requests interception.
