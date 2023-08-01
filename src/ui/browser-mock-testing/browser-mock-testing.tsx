import {useCallback, useRef, useState} from 'react';
import {tryCatchAsync} from '../../lib';
import axios from 'axios';
import {z} from 'zod';
import {queryClient} from '../../main';

export const BrowserMockTesting = () => {
    const urlRef = useRef<HTMLInputElement>(null);
    const methodRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<string>('No data loaded');

    const fetchData = useCallback(() => {
        tryCatchAsync(async () => {
            const {data} = await axios.request({
                url: urlRef.current?.value ?? '',
                method: methodRef.current?.value ?? '',
            });
            setData(JSON.stringify(data));
        });
    }, []);

    const checkoutZod = useCallback(() => {
        const schema1 = z.object({
            field: z
                .preprocess(() => '1', z.string())
                .superRefine(() => {})
                .refine((v) => {
                    console.log('refine', v);
                    return typeof v === 'string';
                }),
        });

        const schema2 = z.object({
            field: z.number(),
        });

        const schema = z.intersection(schema1, schema2);

        const result = schema.safeParse({field: null});

        console.log({result});
    }, []);

    const checkoutQueryClient = useCallback(async () => {
        const OPTIONS = {
            queryKey: ['key'],
            queryFn: async () => {
                console.log('request');
                await new Promise((r) => setTimeout(r, 20000));

                return 'data';
            },
        };

        const data = await queryClient.ensureQueryData({
            ...OPTIONS,
            initialData: () => {
                return queryClient.getQueryData(OPTIONS['queryKey']);
            },
        });
        console.log({data});
    }, []);

    return (
        <div>
            <div className='input-form'>
                <input
                    type='text'
                    ref={urlRef}
                    defaultValue={'/login'}
                    placeholder='URL...'
                />
                <input
                    type='text'
                    ref={methodRef}
                    defaultValue={'POST'}
                    placeholder='post/get...'
                />
            </div>
            <p className='read-the-docs'>{data}</p>
            <div className='button-block'>
                <button onClick={fetchData}>Click to get data</button>
                <button onClick={checkoutZod}>Click to check out zod</button>
                <button onClick={checkoutQueryClient}>
                    Click to checkout query client
                </button>
            </div>
        </div>
    );
};
