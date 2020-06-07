import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import { create as createFedopsLogger } from '@wix/fedops-logger';
import App from './components/App';
import { ResolvedPromiseProvider } from '@wix/react-resolved-promises';

const baseURL = window.__BASEURL__;
const memo = window.__MEMO__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('ssr-demo');

// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

ReactDOM.hydrate(
      <ResolvedPromiseProvider memo={memo}>
        <App />
      </ResolvedPromiseProvider>,
  document.getElementById('root'),
);
