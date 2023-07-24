import {useCallback, useRef, useState} from 'react';
import {tryCatchAsync} from '../../lib';
import axios from 'axios';

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
    }, [tryCatchAsync]);

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
            <button onClick={fetchData}>Click to get data</button>
        </div>
    );
};
