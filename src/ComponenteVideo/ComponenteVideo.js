import React from 'react';
//css
import './ComponenteVideo.css';
//alert
import sweet from 'sweetalert';

class ComponenteVideo extends React.Component{

    _isMount = false;

 
    componentDidMount(){
        this._isMount = true;
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleClick = (event) => {
        let id = event.target.parentNode.parentNode.dataset.idvideo

        sweet({
            text: "Seguro que quieres cerrar sesion?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                fetch(process.env.REACT_APP_DATABASE_URL+'/deleteVideo/'+id,{method:'DELETE'})
                .then(data => data.json())
                .then(response => {
                    if(response.success){
                        //llamamos a la funcion que est a en perfil para que recarge la pantalla
                        const getFetch = this.props.getFetch;
                        getFetch(process.env.REACT_APP_DATABASE_URL+'/video/'+localStorage.getItem('primariKey'), true);
                    }   
                })                
                sweet("Cerrado sesion correctamente", { icon: "success", });
            }
          });
    }

    handleClickVer = (event) => {
        //llamamos a la funcion que esta en app.js
        const handleClickInicioPerfil = this.props.handleClickInicioPerfil;
        handleClickInicioPerfil(event.target.parentNode.parentNode.dataset.idvideo);
    }

    render(){
        // console.log(this.props.nombre);
        return(
            <div className='divComponenteVideo' data-idvideo={this.props.id_video}>
                <div className='divCompoenteVideoIzquierda'>
                    <video src={this.props.video} controls></video>
                </div>
                <div className='divComponenteVideoDerecha'>
                    <p style={{marginTop: this.props.margenParrafo}}><strong>{this.props.titulo_video}</strong></p>
                    <p><em>{this.props.nombre}</em></p>
                    <input type='button' value='Ver' onClick={this.handleClickVer} ></input>
                    {
                        this.props.mostrarBotonBorrar
                        ?
                        <input type='button' value='Borrar' onClick={this.handleClick} ></input>
                        :
                        <div style={{display:'none'}}></div>
                    }
                </div>
            </div>
        )
    }
}

export default ComponenteVideo;