import React, { Component } from 'react';
import axios from 'axios';
import './chat.css';

export class Chat extends Component {
  constructor() {
    super()
    this.mess = React.createRef()
    this.state = {
      showChat: false,
      user: true,
      conversacion: [],
      mensaje: ""
    }
    this.showChat = this.showChat.bind(this);
    this.handleMensaje = this.handleMensaje.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://34.69.25.250:3200/conversacion/1/1"
    }).then((res) => {
      this.setState({
        conversacion: res.data,
      })
    });
  }

  componentDidUpdate(){
    axios({
      method: "GET",
      url: "http://34.69.25.250:3200/conversacion/1/1"
    }).then((res) => {
      this.setState({
        conversacion: res.data,
      })
    });
  }

  showChat(event) {
    event.preventDefault();
    this.setState({
      showChat: !this.state.showChat,
    });
  }

  handleMensaje(event){
    this.setState({ mensaje: event.target.value });
  }

  submit(event){
    if (event.key === 'Enter') {
      console.log(this.state.mensaje);
      axios({
        method: 'post', 
        url: 'http://34.69.25.250:3200/mensaje',
        data: {
          "id_cliente": 1,
	        "id_establecimiento": 1,
	        "remitente": this.user ? 1 : 0,
	        "mensaje": this.state.mensaje
        }
      })
      this.mess.current.value = "";
    }
  }

  render() {
    return (
      <div className="chat">
        {
          this.state.showChat
            ? (
              <div>
                <div className="conversation">
                  {
                    this.state.conversacion.map(res => (
                      <div key={res.id} id={res.remitente === 0 ? "remitente" : "destinatario"}>{res.mensaje}</div>
                    ))
                  }
                </div>
                <input id="mensaje" ref={this.mess} className="input" type="text" placeholder="Mensaje" onChange={this.handleMensaje} onKeyDown={this.submit} />
              </div>
            )
            : (
              null
            )
        }
        <div className="button" onClick={this.showChat}>Chat</div>
      </div>
    )
  }
}