React Resolved Promises
============================

React Resolved Promises is a library with a simple API, aiming to make the "Fetch As You Render" approch available in SSR.

## Installation

Install using npm:

```shell
$ npm install @wix/react-resolved-promises
```

## Usage

getting async data within react functiontional component
```js
import React, { useState, useEffect, useRef } from 'react';
import {useResolvedPromise, ResolvedPromiseStatus } from '@wix/react-resolved-promises';
import axois from 'axios';

const getCharacter = (id: number) =>
    axois.get(`https://swapi.dev/api/people/${id}/`).then(({data}) => data);

export const SW = () => {
    const [id, setId] = useState(1);
    const { status, data, rerun } = useResolvedPromise('/people/1/', () => getCharacter(id));

    useEffectExceptOnMount(() => {
        rerun(() => getCharacter(id))
    }, [id]);

    if (status === ResolvedPromiseStatus.PENDING || status === ResolvedPromiseStatus.PENDING_RERUN) {
        return <div>LOADING...</div>;
    }
    return (
        <div>
            <div>{data.name}</div>
            <button onClick={() => {setId(id + 1)}}>next</button>
        </div>
    );
}


const useEffectExceptOnMount = (effect: () => void, dependencies: any[]) => {
    const mounted = useRef(false);
    useEffect(() => {
      if (mounted.current) {
        effect();
      } else {
        mounted.current = true;
      }
    }, dependencies);
  };
```

rendering the component asyncronisly to string, and getting resolved memo to pass to the browser
```js
  import React from 'react';
  import App from './components/App';
  import { renderToStringOnResolvedPromises } from '@wix/react-resolved-promises';
  import serialize from 'serialize-javascript';

  app.get('/', async (req, res) => {

    const {html, memo} = await renderToStringOnResolvedPromises(<App/>);

    // Send a response back to the client.
    res.renderView('./index.ejs', {html, memo: serialize(memo)});
  });
```

(in index.ejs)
```html
  <body>
    <div id="root"><%- html %></div>
    <script>
      window.__MEMO__ = <%- memo %>;
    </script>
    <script src="<%= baseStaticsUrl %>app.bundle.min.js"></script>
  </body>
```

provide the memo context in order to avoid redundant async action
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ResolvedPromiseProvider } from '@wix/react-resolved-promises';

const memo = window.__MEMO__;

ReactDOM.hydrate(
      <ResolvedPromiseProvider memo={memo}>
        <App />
      </ResolvedPromiseProvider>,
  document.getElementById('root'),
);
```