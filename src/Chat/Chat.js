import React from 'react';
//css
import './Chat.css';
//services
import FuncionesFetch from '../services/services';

class Chat extends React.Component{

    _isMount = false;

    constructor(props){
        super(props)
        this.state = 
            {
                indice:'',
                nombre:'',
                mensaje:''
            }
    }

    componentDidMount(){
        this._isMount = true;
        if(this._isMount){
            this.setState({indice:this.props.usuarioParaChat.indice, nombre:this.props.usuarioParaChat.nombre});
            //llamamos a la funcion que recuperara todos los mesajes que se han enviado los 2 osuarios
            this.fetchGetMensajes();
        }
    }

    fetchGetMensajes = () => {
        let data = new URLSearchParams(`id_usuario_uno=${localStorage.getItem('primariKey')}&id_usuario_dos=${this.props.usuarioParaChat.indice}`);
        FuncionesFetch.getChatUserFetch(data)
        .then(response => {
            console.log(response.data)
        })
    }

    componentWillMount(){
        this._isMount = false;
    }

    handelSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams(`id_chat=${''}&id_usuario_uno=${localStorage.getItem('primariKey')}&id_usuario_dos=${this.state.indice}&mensaje_chat=${this.state.mensaje}`);
        //llamamos al funcion que tiene el fetch que tenemos en la carpeta services que ingresara el mensaje del chat
        FuncionesFetch.addChatFetch(data)
        .then(response => {
            console.log(response.success)
        })
        //llamamos a la funcion que recuperara todos los mesajes que se han enviado los 2 osuarios
        this.fetchGetMensajes();
        //limpiamos el campo de texto
        this.setState({mensaje:''})
    }

    render(){
        // console.log(this.state.indice)
        return(
            <article className='divChat'>

                <div className='tituloChat'>
                    <h2>CHAT CON {this.state.nombre.toUpperCase()}</h2>
                </div>

                <div className='contenedorChat'>
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