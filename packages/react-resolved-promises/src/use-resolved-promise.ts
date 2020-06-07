import { useState, useEffect } from 'react';

type TAsyncFunction = () => Promise<any>;

type TUseResolvedPromise = (asyncFunction: TAsyncFunction) => { 
    status: ResolvedPromiseStatuses, 
    data: any, 
    rerun: (anotherAsyncFunction: TAsyncFunction) => void 
}

export enum ResolvedPromiseStatuses {
    PENDING = 'pending',
    PENDING_RERUN = 'pending-rerun',
    RESOLVED = 'resolved'
};

export const useResolvedPromise: TUseResolvedPromise = (asyncFunction: TAsyncFunction) => {
    const [status, setStatus] = useState(ResolvedPromiseStatuses.PENDING);
    const [data, setData] = useState(undefined);

    const onResolve = data => {
        setData(data);
        setStatus(ResolvedPromiseStatuses.RESOLVED);
    }

    useEffect(() => {
        asyncFunction().then(onResolve)
    }, []);

    const rerun = (anotherAsyncFunction: TAsyncFunction) => {
        setStatus(ResolvedPromiseStatuses.PENDING_RERUN);

        anotherAsyncFunction().then(onResolve)
    }

    return { status, data, rerun };
}