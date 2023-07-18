import {rest} from 'msw';

export const handlers = [
    //* rest can intercepts any request by method and path + regex or regardless method only by path name
    rest.post('/login', (_, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true');
        return res(ctx.status(200));
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
];
