import React, { Component } from 'react';

export default class InputCostumized extends Component {
    
    constructor(){
        super();
        this.state = {msgErro: ''};
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
                <span className="error">{this.state.msgErro} </span>
            </div>
        );
    }
} 
