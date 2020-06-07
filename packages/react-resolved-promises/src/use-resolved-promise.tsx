import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOMServer from 'react-dom/server';

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
};

const getInitStatus = (promiseId: string, memo: TMemo) => {
    if (memo?.get(promiseId)) {
        return ResolvedPromiseStatus.RESOLVED;
    }
    return ResolvedPromiseStatus.PENDING;
}

const getInitData = (promiseId: string, memo: TMemo) => {
    return memo?.get(promiseId);
}

export const useResolvedPromise: TUseResolvedPromise = (promiseId: string, asyncFunction: TAsyncFunction) => {
    const { mode, memo } = useContext(ResolvedPromiseContext);
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

    //effect for non memoized(status===pending) browser(useEffect works only in browser).
    useEffect(() => {
        if (status === ResolvedPromiseStatus.PENDING) {
            asyncFunction().then(onResolve).catch(onReject);
        }
    }, []);

    if (mode === ResolvedPromiseMode.SSR && status === ResolvedPromiseStatus.PENDING) {

    }

    return { status, data, rerun };
}

enum ResolvedPromiseMode {
    SSR = 'ssr',
    BROWSER = 'browser'
}

type TResolvedPromiseContext = {
    mode: ResolvedPromiseMode;
    memo?: TMemo;
    addPromiseToResolve?: (promise: Promise<any>) => void,
}

type TMemo = Map<string, any>;

const ResolvedPromiseContext = createContext<TResolvedPromiseContext>({ mode: ResolvedPromiseMode.BROWSER });

export const ResolvedPromiseProvider = ({ memo, children }) => {
    return <ResolvedPromiseContext.Provider value={{ mode: ResolvedPromiseMode.BROWSER, memo }}>
        {children}
    </ResolvedPromiseContext.Provider>
}

type TRenderToStringOnResolvedPromises = (
    Component: any,
) => Promise<{ html: string; memo: any }>

export const renderToStringOnResolvedPromises: TRenderToStringOnResolvedPromises = async (Component: any) => {
    const memo: Map<string, any> = new Map<string, any>();
    const overallPromisesToResolve: Promise<any>[] = [];

    const addPromiseToResolve = (promise: Promise<any>) => {
        overallPromisesToResolve.push(promise);
    };

    let prevOverallFetchersPromisesLength: number =
        overallPromisesToResolve.length;
    let html = renderAttempt(Component, memo, addPromiseToResolve);
    while (overallPromisesToResolve.length > prevOverallFetchersPromisesLength) {
        prevOverallFetchersPromisesLength = overallPromisesToResolve.length;
        await Promise.all(overallPromisesToResolve);
        html = renderAttempt(Component, memo, addPromiseToResolve);
    }

    return { html, memo };
}

const renderAttempt = (
    Component: any,
    memo: Map<string, any>,
    addPromiseToResolve: (promise: Promise<any>) => void,
) =>
    ReactDOMServer.renderToString(
        <ResolvedPromiseContext.Provider
            value={{ mode: ResolvedPromiseMode.SSR, memo, addPromiseToResolve }}
        >
            {Component}
        </ResolvedPromiseContext.Provider>,
    );
