import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './assets/stylesheets/index.scss';

render(<App name='World' />, document.getElementById('root'));
