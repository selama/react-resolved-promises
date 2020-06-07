import React from 'react';
declare type TAsyncFunction = () => Promise<any>;
declare type TUseResolvedPromise = (promiseId: string, asyncFunction: TAsyncFunction) => {
    status: ResolvedPromiseStatus;
    data: any;
    rerun: (anotherAsyncFunction: TAsyncFunction) => void;
};
export declare enum ResolvedPromiseStatus {
    PENDING = "pending",
    PENDING_RERUN = "pending-rerun",
    RESOLVED = "resolved",
    REJECT = "reject"
}
export declare const useResolvedPromise: TUseResolvedPromise;
declare enum ResolvedPromiseMode {
    SSR = "ssr",
    BROWSER = "browser"
}
declare type TResolvedPromiseContext = {
    mode: ResolvedPromiseMode;
    memo?: TMemo;
    addPromiseToResolve?: (promise: Promise<any>) => void;
};
declare type TMemo = Map<string, any>;
export declare const ResolvedPromiseContext: React.Context<TResolvedPromiseContext>;
export declare const ResolvedPromiseProvider: ({ memo, children }: {
    memo: any;
    children: any;
}) => JSX.Element;
declare type TRenderToStringOnResolvedPromises = (Component: any) => Promise<{
    html: string;
    memo: any;
}>;
export declare const renderToStringOnResolvedPromises: TRenderToStringOnResolvedPromises;
export {};
//# sourceMappingURL=use-resolved-promise.d.ts.map