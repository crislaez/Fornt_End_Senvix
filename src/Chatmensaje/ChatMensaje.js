import React from 'react';
//css
import './ChatMensaje.css';
//alert
import sweet from 'sweetalert';
//services
import FuncionesFetch from '../services/services';
class ChatMensaje extends React.Component{

    handleClickBorrarMensaje = () => {
        //id de cada chat para borrarlo
        console.log(this.props.id_chat)
        sweet({
            title: 'Seguro que quiere borrar el mensaje?',
            icon: "warning",
            buttons: true,
            dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            FuncionesFetch.deleteChat(this.props.id_chat)
            .then(response => console.log(response))
            .catch(err => console.log(err));
            
            //llamamos a la funcion que esta en Chat para recargar el array de mensajes
            const fetchGetMensajes = this.props.fetchGetMensajes;
            fetchGetMensajes();
            
            sweet("Mensaje borrado", {
            icon: "success",
          });
        }
      });
    }

    render(){
        
        return(
            <div dato-indice={this.props.id_chat} className='divCajitaChat' style={{float:`${this.props.flotar}`}}>
                <p><strong>{this.props.id_usuario_uno}: </strong>{this.props.mensaje_chat}</p>
                {
                    this.props.flotar === 'left'
                    ?
                        <input type='button' value='Borrar' onClick={this.handleClickBorrarMensaje}></input>
                    :
                    <div style={{display:'none'}}></div>
                }
            </div>
        )
    }
}

export default ChatMensaje; 