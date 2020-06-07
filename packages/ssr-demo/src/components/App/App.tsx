import React from 'react';
import s from './App.scss';
import { SW } from '../SW/sw';


interface AppProps {}

class App extends React.Component<AppProps> {
  

  render() {

    return (
      <div className={s.root}>
        SELA
        <SW />
      </div>
    );
  }
}

export default App;
