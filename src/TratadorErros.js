import PubSub from 'pubsub-js';

export default class TratadorErros{
  publicaErros(erros){
      for(var i=0; i<erros.error.length; i++){
          var erro = erros.erros[i];
          PubSub.publish("erro-validacao", erro);   
      }
  }

  componentDidMount(){
       PubSub.subscribe('erro-validacao', function(topico, erro){
        this.setState({msgErro: erro.error})
       }.bind(this));
  }  
} 