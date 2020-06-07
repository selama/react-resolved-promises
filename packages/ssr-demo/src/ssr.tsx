import React from 'react';
import App from './components/App';
import { renderToStringOnResolvedPromises } from '@wix/react-resolved-promises';

export const getHtml = async () => {
    return renderToStringOnResolvedPromises(<App/>);
}
