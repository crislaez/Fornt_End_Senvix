import React from 'react';
//css
import './Chat.css';
//services
import FuncionesFetch from '../services/services';
//componente 
import ChatMensaje from '../Chatmensaje/ChatMensaje';
class Chat extends React.Component{

    _isMount = false;
    _flotar = 'left';
    _intervalo;

    constructor(props){
        super(props)
        this.state = 
            {
                indice:'',
                nombre:'',
                mensaje:'',
                arrayChat:[],
            }
    }

    componentDidMount(){
        this._isMount = true;
        if(this._isMount){
            this.setState({indice:this.props.usuarioParaChat.indice, nombre:this.props.usuarioParaChat.nombre});
            //llamamos a la funcion que recuperara todos los mesajes que se han enviado los 2 osuarios
            this.fetchGetMensajes();

            this._intervalo = setInterval( () => {
                this.fetchGetMensajes();
            },1000)
        }
    }

    fetchGetMensajes = () => {
        let data = new URLSearchParams(`id_usuario_uno=${localStorage.getItem('primariKey')}&id_usuario_dos=${this.props.usuarioParaChat.indice}`);
        FuncionesFetch.getChatUserFetch(data)
        .then(response =>  this.setState({arrayChat:response.data}))
    }

    componentWillUnmount(){
        this._isMount = false;
        clearInterval(this._intervalo);
    }

    handelSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams(`id_chat=${''}&id_usuario_uno=${localStorage.getItem('primariKey')}&id_usuario_dos=${this.state.indice}&mensaje_chat=${this.state.mensaje}`);
        //llamamos al funcion que tiene el fetch que tenemos en la carpeta services que ingresara el mensaje del chat
        FuncionesFetch.addChatFetch(data)
        .then(response => console.log(response.success))
        .catch(err => console.log(err));
        
        //llamamos a la funcion que recuperara todos los mesajes que se han enviado los 2 osuarios
        this.fetchGetMensajes();
        //limpiamos el campo de texto
        this.setState({mensaje:''});
        //creamos una notificacion para que le llege al usuario
        this.spawnNotification('Te ha llegado un mensaje','icono.png','Notificacion');
    }

    
    spawnNotification = (theBody,theIcon,theTitle) => {
        var options = {
            body: theBody,
            icon: theIcon
        }
        var n = new Notification(theTitle,options);
        setTimeout(n.close.bind(n), 5000); 
    }

    render(){
        console.log(this.state.arrayChat)
        return(
            <article className='divChat'>

                <div className='tituloChat'>
                    <h2>CHAT CON {this.state.nombre.toUpperCase()}</h2>
                </div>

                <div className='contenedorChat'>
                    {
                        this._isMount && this.state.arrayChat.toString()
                        ?
                        this.state.arrayChat.map( (dato, key) => {
                            if(dato.id_usuario_uno == localStorage.getItem('primariKey')){
                               this._flotar = 'left';
                            }else{
                                this._flotar = 'right'
                            }
                            return(
                                <ChatMensaje key={key} id_chat={dato.id_chat} id_usuario_uno={dato.id_usuario_uno} mensaje_chat={dato.mensaje_chat} flotar={this._flotar}></ChatMensaje>
                            )
                        })
                        :
                        <div></div>
                    }
                </div>

                <form onSubmit={this.handelSubmit} action='' method='' encType='multipart/form-data'>
                    <input type='text' value={this.state.mensaje} onChange={(params) => {this.setState({mensaje:params.target.value})}} placeholder='mensaje...'></input>
                    <input type='submit' value='Enviar'></input>
                </form>

            </article>
        )
    }
}

export default Chat;