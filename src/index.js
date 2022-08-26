import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import Providers from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId='6965eb70-6baf-4aaf-a927-a0a373889412' language='en'>
      <Providers>
        <App />
      </Providers>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
