import React from 'react';
//css
import './ChatMensaje.css'

class ChatMensaje extends React.Component{

    render(){
        
        return(
            <div dato-indice={this.props.id_chat} className='divCajitaChat' style={{float:`${this.props.flotar}`}}>
                <p><strong>{this.props.id_usuario_uno}: </strong>{this.props.mensaje_chat}</p>
            </div>
        )
    }
}

export default ChatMensaje; 