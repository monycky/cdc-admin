import React, { Component } from 'react';
import $ from 'jquery';
import InputCostumized from './components/InputCostumized';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';


class FormularioLivro extends Component {
  constructor() {
    super();
    this.state = {titulo: '', preco: '', autorId: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setTitulo = this.setTitulo.bind(this);
    this.setPreco = this.setPreco.bind(this);
    this.setAutorId = this.setAutorId.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/livros",
      contentType: "application/json",
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
      success: function (novaLista) {
        PubSub.publish('atualiza-lista-livros', novaLista);
        this.setState({ titulo: '', preco: '', autorId: '' });
      }.bind(this),
      error: function (resposta) {
        if (resposta.status === 400) {
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function () {
        PubSub.publish("limpa-erros", {});
      }
    });
  }

  setTitulo(evento) {
    this.setState({ titulo: evento.target.value });
  }

  setPreco(evento) {
    this.setState({ preco: evento.target.value });
  }

  setAutorId(evento) {
    this.setState({ autorId: evento.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form
          className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post" >
          <div className="pure-control-group">
            <InputCostumized id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
            <InputCostumized id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço" />
            <InputCostumized id="autorId" type="text" name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="Autor" />
          </div>
          <div className="pure-control-group">
            <label />
            <button type="submit" className="pure-button pure-button-primary">
              Gravar
                  </button>
          </div>
        </form>
      </div>);
  }
}

class TabelaLivros extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Preço</th>
               <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(function (livros) {
              return (
                <tr key={livros.id}>
                  <td>{livros.titulo}</td>
                  <td>{autor.preco}</td>
                   <td>{autor.autorId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

}

export default class LivroBox extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/livros",
      dataType: "json",
      success: function (resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    });
    PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
      this.setState({ lista: novaLista });
    }.bind(this));
  }


  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivro/>
          <TabelaAutores lista={this.state.lista} />
        </div>

      </div>
    );
  }

}