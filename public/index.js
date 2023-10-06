import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from '../src/client/App.js';
import './style.css';

const rootElement = document.getElementById('root');
console.log('Index.js is loaded!');

if (rootElement) {
    console.log('Root element found!');
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found!');
}
