import React from 'react';
//css
import './FormularioVideo.css';
//alert
import sweet from 'sweetalert';

class FormularioVideo extends React.Component{

    constructor(props){
        super(props)
        this.state = 
            {
                video:'',
                tituloVideo:''
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.video){
            sweet('Oops','Ingrese un video','error')
        }
        else if(!this.state.tituloVideo){
            sweet('Oops','Ingrese uin titulo para el video','error')
        }
        else{

            let formData = new FormData();
            formData.append('id_usuario', localStorage.getItem('primariKey'));
            formData.append('id_video', '');
            formData.append('video', this.state.video);
            formData.append('titulo_video', this.state.tituloVideo);

            fetch('http://localhost:3001/api/addVideo',{method:'POST', body:formData})
            .then(data => data.json())
            .then(response => {
               
                if(response.success){
                    //llamamos a la funcion que esta en Perfil para que se cierra este componente de formulario video
                    sweet('Ok','video subido correctamente','success')
                    const handleClick = this.props.handleClick;
                    handleClick();
                    //llamamos a la funcion que sta en perfil para que vuelva a pedir los datos
                    const getFetch = this.props.getFetch;
                    getFetch('http://localhost:3001/api/video/'+localStorage.getItem('primariKey'), true);
                }
                else{
                    sweet('Oops','ha ocurrido un error','error');
                }
                   
            })

            this.setState({tituloVideo: ''})
        }       
    }

    render(){

        return(
            <div className='divFormularioVideo'>

                <div className='contenedorDivFormularioVideo'>
                    <div className='divTituloFormularioVideo'>
                        <h3>SUBIR FOTO</h3>
                        <button onClick={this.props.handleClick}>X</button>
                    </div>

                    <form onSubmit={this.handleSubmit} action='' method='POST' encType='multipart/form-data'>
                        <input type='file' onChange={(params) => {this.setState({video:params.target.files[0]})}}></input>
                        <br></br>
                        <input type='text' value={this.state.tituloVideo} onChange={(params) => {this.setState({tituloVideo:params.target.value})}} placeholder='titulo del video...'></input>
                        <br></br>
                        <input type='submit' value='Subir video'></input>
                    </form>
                </div>

            </div>
        )
    }
}

export default FormularioVideo;