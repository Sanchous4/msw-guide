import {rest} from 'msw';

export const handlers = [
    //* rest can intercepts any request by method and path + regex or regardless method only by path name
    rest.post('/login', (_, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true');
        return res(ctx.status(200), ctx.json('You logged in successfully'));
    }),

    rest.get('/login/token', (_, res, ctx) => {
        return res(
            ctx.json({
                authToken: 'xxx-xxx',
            })
        );
    }),

    rest.all('/login/*', (req, res, ctx) => {
        return res(
            ctx.status(400),
            ctx.json({
                errorMessage: `No such login path with method ${req.method}`,
            })
        );
    }),

    //* RegExp to match request url
    // This request handler would match all these requests:
    // - DELETE http://localhost:8080/posts/
    // - DELETE https://backend.dev/user/posts/
    rest.delete(/\/posts\//, () => {}),
];
