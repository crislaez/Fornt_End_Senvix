import React from 'react';
//css
import './CajaSeguido.css';
//alert
import sweet from 'sweetalert';
//servicios
import FuncionesFetch from '../services/services'

class CajaSeguido extends React.Component{

    handleClickVerPerfil = (event) => {
        let id = event.target.parentNode.parentNode.dataset.codigo

        //llamamos a la funcion que esta en app.js para pasarle el nombre del usuario a buscar
        const handleClickAsideBuscadorPerfil = this.props.handleClickAsideBuscadorPerfil;

        //llamamos a la funcion getVideo name qeu esta en la carpeta services
        FuncionesFetch.getVideoName(id)
        .then(response => {

            if(response.data.toString()){
            
                handleClickAsideBuscadorPerfil(response.data);                   
            }
            else{
                FuncionesFetch.getUserById(id)
                .then(response => handleClickAsideBuscadorPerfil(response.data))
                .catch(err => console.log(err))
            }
            //llamamos a la funcion que esta en app.js para cerrar el menu buscador
            const funcionAparecerMenuLateral = this.props.funcionAparecerMenuLateral
            funcionAparecerMenuLateral();
        })
        .catch(err => console.log(err));
    }

    handleClickEnviarMensaje = () => {
        let usuario = 
            {
                nombre:this.props.nombre,
                indice:this.props.id_usuario
            };
        const funcionChat = this.props.funcionChat;
        funcionChat(usuario);
    }

    handleClickDejarDeSeguir = (event) => {
        let id = event.target.parentNode.parentNode.dataset.codigo
        console.log(id);
        sweet({
            text: "Seguro que quieres dejar de seguirle?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                let data = new URLSearchParams(`seguido=${id}&seguidor=${localStorage.getItem('primariKey')} `);
                fetch('http://localhost:3001/api/unFollow',{method:'DELETE', body:data})
                .then(data => data.json())
                .then(response => {
                    console.log(response);
                    sweet('Ok','Ya no le sigues','success');
                    //llamamos a la funcion que esta en Seguidos para que recarge la funcion que muestre a las personas que se sigue
                    const getFetch = this.props.getFetch;
                    //llamamos a la funcion fetch que esta abajo para conseguir todos los seguidores
                    getFetch(process.env.REACT_APP_DATABASE_URL+'/getFolowers/'+localStorage.getItem('primariKey'), 3); 
                });

                sweet("Cerrado sesion correctamente", {
                icon: "success",
              });
            }
          });
    }

    render(){
        return(
            <div data-nombre={this.props.nombre} data-codigo={this.props.id_usuario} className='divCagitaSeguidos'>

                <div className='divImagenCagitaSeguidos'>
                    <img src={this.props.avatar} alt={this.props.avatar}></img>
                </div>

                <div className='divParrafoCagitaSeguidos'>
                    <p>{this.props.nombre}</p>                    
                </div>

                <div className='divBotonCagitaSeguido'>
                    <input type='button' value='Ver perfil' onClick={this.handleClickVerPerfil}></input>
                    <input type='button' value='Dejar de seguir' onClick={this.handleClickDejarDeSeguir}></input>
                    {
                        this.props.id_usuario != localStorage.getItem('primariKey')
                        ?
                        <input type='button' value='Mensajes' onClick={this.handleClickEnviarMensaje}></input>
                        :
                        <div style={{display:'none'}}></div>

                    }
                    
                </div>

            </div>
        )
    }
}

export default CajaSeguido;