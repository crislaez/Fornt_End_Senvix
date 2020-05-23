import React from 'react';
//css
import './Perfil.css';
//componente
import FormularioVideo from '../FormularioVideo/FormularioVideo';
import ComponenteVideo from '../ComponenteVideo/ComponenteVideo';
import Seguidos from '../Seguidos/Seguidos';
class Perfil extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                usuario:'',
                indice:'',
                aparecerFormulario:false,
                aparecerSeguidos: '0px',
                arrayVideosUsuario:[],
                foto:'',
                banner:'',
                arraySeguidos:[]
            }
    }

    componentDidMount(){
        this._isMount = true;
        if(localStorage.getItem('nombreUsuario') && localStorage.getItem('primariKey')){
            this.setState({usuario: localStorage.getItem('nombreUsuario'), indice: localStorage.getItem('primariKey')});
            //llamamos a la funcion fetch que esta abajo para conmseguir todos los videos del usuario registrado
            this.getFetch(process.env.REACT_APP_DATABASE_URL+'/video/'+localStorage.getItem('primariKey'), 1);
            //llamamos a la funcion fetch que esta abajo para conmseguir los datos del usuario registrado
            this.getFetch(process.env.REACT_APP_DATABASE_URL+'/user/'+localStorage.getItem('primariKey'), 2);
            //llamamos a la funcion fetch que esta abajo para conseguir todos los seguidores
            this.getFetch(process.env.REACT_APP_DATABASE_URL+'/getFolowers/'+localStorage.getItem('primariKey'), 3);       
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
            // console.log(response.data)
            if(response.data){
                if(bool === 1){                
                    this.setState({arrayVideosUsuario:response.data})
                }
                else if(bool === 2){
                    this.setState({foto: response.data[0].avatar, banner: response.data[0].banner})
                }
                else{
                    this.setState({arraySeguidos:response.data});                 
                }
            }                       
        })
    };    

    handleClick = () => {
        this.setState({aparecerFormulario: !this.state.aparecerFormulario})
        console.log(this.state.aparecerFormulario)        
    }

    //funcion que habrira el desplegable de los seguidores
    handleClicSeguido = () => {
        if(this.state.aparecerSeguidos === '220px'){
            this.setState({aparecerSeguidos:'0%'});
        }else{
            this.setState({aparecerSeguidos:'220px'});           
        }
        
    }

    render(){

        return(
            <article className='divPerfil'>

                <div className='divTituloPerfil' style={{ background: `url(${this.state.banner}) 0 0/100% 270px` }} >

                    <div className='divFotoPerfil'>
                        <img src={this.state.foto} alt={this.state.foto}></img>
                    </div>
                    <h2>Bienvenido {this.state.usuario}</h2>                
                    <input type='button' value='Subir video' onClick={this.handleClick}></input>
                    <input type='button' value='Ver a quien sigo' onClick={this.handleClicSeguido}></input>
                    <Seguidos aparecerSeguidos={this.state.aparecerSeguidos} handleClicSeguido={this.handleClicSeguido} arraySeguidos={this.state.arraySeguidos} handleClickAsideBuscadorPerfil={this.props.handleClickAsideBuscadorPerfil} getFetch={this.getFetch} funcionChat={this.props.funcionChat}></Seguidos>
                        
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
                        this._isMount && this.state.arrayVideosUsuario.toString()
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
                                nombre={dato.nombre}
                                getFetch={this.getFetch}
                                handleClickInicioPerfil={this.props.handleClickInicioPerfil}
                                ></ComponenteVideo>
                            )
                        })
                        :
                        <div className='divNohayVideos'>
                            <h3>Aun no has subido ningun video, animate ;)</h3>
                        </div>
                    }

                </div>
            </article>
        )
    }
}

export default Perfil;