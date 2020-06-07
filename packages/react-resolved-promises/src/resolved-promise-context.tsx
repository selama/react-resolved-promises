import { createContext } from 'react';

type TResolvedPromiseContext = {
    mode: ResolvedPromiseMode;
    memo?: TMemo;
    addPromiseToResolve?: (promise: Promise<any>) => void,
}

export type TMemo = Map<string, any>;

export enum ResolvedPromiseMode {
    SSR = 'ssr',
    BROWSER = 'browser'
}

export const ResolvedPromiseContext = createContext<TResolvedPromiseContext>({ mode: ResolvedPromiseMode.BROWSER });
