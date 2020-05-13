import React from 'react';
//css
import './Perfil.css';
//componente
import FormularioVideo from '../FormularioVideo/FormularioVideo';

class Perfil extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                usuario:'',
                indice:'',
                aparecerFormulario:false
            }
    }
    componentDidMount(){
        if(localStorage.getItem('nombreUsuario') && localStorage.getItem('primariKey')){
            this.setState({usuario: localStorage.getItem('nombreUsuario'), indice: localStorage.getItem('primariKey')})
        }
    }

    handleClick = () => {
        this.setState({aparecerFormulario: !this.state.aparecerFormulario})
        console.log(this.state.aparecerFormulario)        
    }

    render(){

        return(
            <article className='divPerfil'>
                <div className='divTituloPerfil'>
                    <h2>Bienvenido {this.state.usuario}</h2>
                    <input type='button' value='Subir video' onClick={this.handleClick}></input>
                </div>

                <div className='divContenedorPerfil'>
                    {
                        !this.state.aparecerFormulario
                        ?
                        <div></div>
                        :
                        <FormularioVideo handleClick={this.handleClick}></FormularioVideo>
                    }

                </div>
            </article>
        )
    }
}

export default Perfil;