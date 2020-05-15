import React from 'react';
//css
import './Section.css';
//componentes
import Aside from '../Aside/Aside'
import Login from '../Login/Login'
import Registrarse from '../Registrarse/Registrarse'
import Inicio from '../Inicio/Inicio'
import Perfil from '../Perfil/Perfil'
import ComponenteComentarios from '../ComponenteComentarios/ComponenteComentarios'

class Section extends React.Component{

    render(){
        // indiceComponenteComentarios
        return(
            <section>
                <Aside aparecerMenu={this.props.aparecerMenu}></Aside>
                {
                    this.props.cambioventana === 'bInicio'
                    ?
                    <Inicio handleClickInicioPerfil={this.props.handleClickInicioPerfil}></Inicio>
                    :
                    this.props.cambioventana === 'bPerfil'
                    ?
                    <Perfil handleClickInicioPerfil={this.props.handleClickInicioPerfil}></Perfil>
                    :
                    this.props.cambioventana === 'bComponeteComentarios'
                    ?
                    <ComponenteComentarios indiceComponenteComentarios={this.props.indiceComponenteComentarios} volverAlInicio={this.props.volverAlInicio}></ComponenteComentarios>
                    :
                    <div></div>
                }

                {
                    this.props.ventanaLogin
                    ?
                    <Login funcionAparecerDesaparecerLogin={this.props.funcionAparecerDesaparecerLogin} funcionMostrarLoginOCerrarSesion={this.props.funcionMostrarLoginOCerrarSesion}></Login>
                    :
                    <div></div>
                }

                {
                    this.props.ventanaRegistro
                    ?
                    <Registrarse funcionAparecerDesaparecerRegistro={this.props.funcionAparecerDesaparecerRegistro} funcionAparecerDesaparecerLogin={this.props.funcionAparecerDesaparecerLogin}></Registrarse>
                    :
                    <div></div>
                }
            </section>
        )
    }
}

export default Section;