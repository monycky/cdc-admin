import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} />
        <Route path='/autor' component={AutorBox}/>
        <Route path='/livro' />

    </Router>,
    document.getElementById('root'));
registerServiceWorker();
