import React from 'react';
//css
import './Perfil.css';
//componente
import FormularioVideo from '../FormularioVideo/FormularioVideo';

import ComponenteVideo from '../ComponenteVideo/ComponenteVideo';
class Perfil extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                usuario:'',
                indice:'',
                aparecerFormulario:false,
                arrayVideosUsuario:[],
                foto:''
            }
    }
    componentDidMount(){
        this._isMount = true;
        if(localStorage.getItem('nombreUsuario') && localStorage.getItem('primariKey')){
            this.setState({usuario: localStorage.getItem('nombreUsuario'), indice: localStorage.getItem('primariKey')});
            //llamamos a la funcion fetch que esta abajo
            this.getFetch(process.env.REACT_APP_DATABASE_URL+'/video/'+localStorage.getItem('primariKey'), true);
            this.getFetch(process.env.REACT_APP_DATABASE_URL+'/user/'+localStorage.getItem('primariKey'), false)
       
        }
    }


    componentWillUnmount(){
        this._isMount = false;
    }

    //funcion para fetch
    getFetch = (url,bool) => {
        fetch(url,{method:'GET'})
        .then(data => data.json())
        .then(response => {
            if(response.data){
                if(bool){                
                    this.setState({arrayVideosUsuario:response.data})
                }else{
                    this.setState({foto:response.data[0].avatar})
                } 
            }                       
        })
    }

    handleClick = () => {
        this.setState({aparecerFormulario: !this.state.aparecerFormulario})
        console.log(this.state.aparecerFormulario)        
    }

    render(){
        console.log(this.state.arrayVideosUsuario);
        console.log(this.state.foto);
        return(
            <article className='divPerfil'>
                <div className='divTituloPerfil'>
                    <div className='divFotoPerfil'>
                        <img src={this.state.foto} alt={this.state.foto}></img>
                    </div>
                    <h2>Bienvenido {this.state.usuario}</h2>
                    <input type='button' value='Subir video' onClick={this.handleClick}></input>
                </div>

                <div className='divContenedorPerfil'>
                    {
                        !this.state.aparecerFormulario
                        ?
                        <div></div>
                        :
                        <FormularioVideo handleClick={this.handleClick} getFetch={this.getFetch}></FormularioVideo>
                    }

                    {
                        this._isMount && this.state.arrayVideosUsuario
                        ?
                        this.state.arrayVideosUsuario.map( (dato, key) => {
                            return(
                                <ComponenteVideo 
                                key={key} 
                                id_usuario={dato.id_usuario} 
                                id_video={dato.id_video} 
                                video={dato.video} 
                                titulo_video={dato.titulo_video}
                                mostrarBotonBorrar={true}
                                getFetch={this.getFetch}
                                margenParrafo={'10px'}
                                ></ComponenteVideo>
                            )
                        })
                        :
                        <div></div>
                    }

                </div>
            </article>
        )
    }
}

export default Perfil;