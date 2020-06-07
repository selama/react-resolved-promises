import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { ResolvedPromiseContext, ResolvedPromiseMode } from './resolved-promise-context';

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

    return { html, memo: mapToJson(memo) };
}

const renderAttempt = (
    Component: any,
    memo: Map<string, any>,
    addPromiseToResolve: (promise: Promise<any>) => void,
) =>{
    return ReactDOMServer.renderToString(
        <ResolvedPromiseContext.Provider
            value={{ mode: ResolvedPromiseMode.SSR, memo, addPromiseToResolve }}
        >
            {Component}
        </ResolvedPromiseContext.Provider>,
    );
}

const mapToJson = (m: Map<string, any>) => {
    const json = {};
    m.forEach((v, k) => {
        json[k] = v;
    });
    return json;
}
