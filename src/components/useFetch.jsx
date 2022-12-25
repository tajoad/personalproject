import { useState, useEffect } from 'react';

const useFetch = (url, method, body) => {
    const [data, setData] = useState(null);
    const [ispending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        // setTimeout(() => {
        fetch(url, {method, body, signal: abortCont.signal, mode:'no-cors'})
            .then(res => {
                if (!res.ok) {
                    throw Error('');
                }
                return res.json()
            }).then(data => {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch Aborted')
                    console.log(err);
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
        // }, 1000)

        return () => abortCont.abort();
    }, [url]);

    return { data, ispending, error };
}

export default useFetch;