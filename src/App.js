import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import {FormularioAutor, TabelaAutores} from './Autor'

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
                <a href="#" className="pure-menu-link">Home</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Autores</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Livros</a>
              </li>

            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
              <FormularioAutor/>
              <TabelaAutores/>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
