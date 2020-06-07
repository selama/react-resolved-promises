import React from 'react';
import {ResolvedPromiseContext, ResolvedPromiseMode} from './resolved-promise-context';

export const ResolvedPromiseProvider = ({ memo, children }) => {
    return <ResolvedPromiseContext.Provider value={{ mode: ResolvedPromiseMode.BROWSER, memo: jsonToMap(memo) }}>
        {children}
    </ResolvedPromiseContext.Provider>
}

const jsonToMap = (json: any) => {
    const m = new Map();
    Object.keys(json).forEach(key => m.set(key, json[key]));
    return m;
}
