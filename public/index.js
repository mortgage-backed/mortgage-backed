import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Board } from './board';
import './style.css';

// ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
const rootElement = document.getElementById('root');
ReactDOM.render(<Board />, rootElement);