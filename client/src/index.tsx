import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import App from './App';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
