import { useState, useEffect, useContext } from 'react';
import {TMemo, ResolvedPromiseContext, ResolvedPromiseMode} from './resolved-promise-context';

type TAsyncFunction = () => Promise<any>;

type TUseResolvedPromise = (promiseId: string, asyncFunction: TAsyncFunction) => {
    status: ResolvedPromiseStatus,
    data: any,
    rerun: (anotherAsyncFunction: TAsyncFunction) => void
}

export enum ResolvedPromiseStatus {
    PENDING = 'pending',
    PENDING_RERUN = 'pending-rerun',
    RESOLVED = 'resolved',
    REJECT = 'reject',
    SETTLED = 'settled',
};

const getInitStatus = (promiseId: string, memo: TMemo) => {
    if (memo?.get(promiseId)) {
        return ResolvedPromiseStatus.SETTLED;
    }
    return ResolvedPromiseStatus.PENDING;
}

const getInitData = (promiseId: string, memo: TMemo) => {
    return memo?.get(promiseId);
}

export const useResolvedPromise: TUseResolvedPromise = (promiseId: string, asyncFunction: TAsyncFunction) => {
    const { mode, memo, addPromiseToResolve } = useContext(ResolvedPromiseContext);
    const [status, setStatus] = useState(getInitStatus(promiseId, memo));
    const [data, setData] = useState(getInitData(promiseId, memo));

    const onResolve = data => {
        setData(data);
        setStatus(ResolvedPromiseStatus.RESOLVED);
    }

    const onReject = data => {
        setData(data);
        setStatus(ResolvedPromiseStatus.REJECT);
    }

    const rerun = (anotherAsyncFunction: TAsyncFunction) => {
        setStatus(ResolvedPromiseStatus.PENDING_RERUN);
        anotherAsyncFunction().then(onResolve).catch(onReject);
    }

    //this hook does not run on ssr
    useEffect(() => {
        if (status === ResolvedPromiseStatus.PENDING) {
            asyncFunction().then(onResolve).catch(onReject);
        }
    }, []);

    if (mode === ResolvedPromiseMode.SSR && status === ResolvedPromiseStatus.PENDING && addPromiseToResolve) {
        addPromiseToResolve(
            asyncFunction()
            .then(data => memo.set(promiseId, data))
            .catch(data => memo.set(promiseId, data))
        )
    }

    return { status, data, rerun };
}
