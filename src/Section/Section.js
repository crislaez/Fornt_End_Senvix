import React from 'react';
//css
import './Section.css';
//componentes
import Aside from '../Aside/Aside'
import Login from '../Login/Login'
import Registrarse from '../Registrarse/Registrarse'
import Inicio from '../Inicio/Inicio'
import Perfil from '../Perfil/Perfil'

class Section extends React.Component{

    render(){

        return(
            <section>
                <Aside aparecerMenu={this.props.aparecerMenu}></Aside>
                {
                    this.props.cambioventana === 'bInicio'
                    ?
                    <Inicio></Inicio>
                    :
                    this.props.cambioventana === 'bPerfil'
                    ?
                    <Perfil></Perfil>
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