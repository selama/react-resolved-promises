import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import s from './App.scss';
import { SW } from '../SW/sw';


interface AppProps extends WithTranslation {}

class App extends React.Component<AppProps> {
  

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <h2 className={s.title} data-hook="app-title">
          {t('app.title')}
        </h2>
        <SW/>
      </div>
    );
  }
}

export default withTranslation()(App);
