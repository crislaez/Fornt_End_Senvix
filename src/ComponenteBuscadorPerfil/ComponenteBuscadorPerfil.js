import React from 'react';
//css
import './ComponenteBuscadorPerfil.css';
//componente
import ComponenteVideo from '../ComponenteVideo/ComponenteVideo'
class ComponenteBuscadorPerfil extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayUsuarioBuscado:[],
                usuario:'',
                avatar:'',
                banner:''
            };
    }

    componentDidMount(){
        this._isMount = true;
        this.setState({arrayUsuarioBuscado:this.props.usuario, usuario:this.props.usuario[0].nombre, avatar:this.props.usuario[0].avatar, banner:this.props.usuario[0].banner});
    }

    componentDidUpdate(prevProps){
        if(this.props.usuario !== prevProps.usuario){
            this.setState({arrayUsuarioBuscado:this.props.usuario, usuario:this.props.usuario[0].nombre, avatar:this.props.usuario[0].avatar, banner:this.props.usuario[0].banner})
         }        
     }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        console.log(this.state.arrayUsuarioBuscado);
        console.log(this.state.usuario);
        console.log(this.state.avatar);
        console.log(this.state.banner);

        return(
            <article className='articleBuscador'>
                <div className='divBannerBuscador' style={{ background: `url(${this.state.banner}) 0 0/100% 200px` }}>
                    <div className='divFotoBuscador'>
                        <img src={this.state.avatar} alt={this.state.avatar}></img>                        
                    </div>
                    <div className='divTituloBuscador'>
                        <p><strong>{this.state.usuario}</strong></p>
                    </div>
                    
                </div>

                <div className='divContenedorBuscador'>
                    {
                        this._isMount && this.state.arrayUsuarioBuscado.toString()
                        ?
                        this.state.arrayUsuarioBuscado.map( (dato, key) => {
                            return(
                                <ComponenteVideo 
                                key={key} 
                                // id_usuario={dato.id_usuario} 
                                id_video={dato.id_video} 
                                video={dato.video} 
                                titulo_video={dato.titulo_video}
                                nombre={dato.nombre}
                                mostrarBotonBorrar={false}
                                // getFetch={this.getFetch}
                                handleClickInicioPerfil={this.props.handleClickInicioPerfil}
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

export default ComponenteBuscadorPerfil;