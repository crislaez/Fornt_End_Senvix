import React from 'react';
//css
import './Comentario.css'

class Comentario extends React.Component{
    
    render(){

        return(
            <div className='divComentario' data-indice={this.props.id_comentario}>
                <p>{this.props.usuario}: <em>{this.props.comentario}</em></p>
            </div>
        )
    }
}

export default Comentario;