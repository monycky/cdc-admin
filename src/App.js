import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import {Link} from 'react-router'
import AutorBox from './Autor'

class App extends Component {
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span />
        </a>
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link to="/" className="pure-menu-link">Home</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/autor" className="pure-menu-link">Autores</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="#" className="pure-menu-link">Livros</Link>
              </li>

            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Bem vindo ao Sistema</h1>
          </div>
          <div className="content" id="content">
          </div>
        </div>

      </div>
    );
  }
}

export default App;
