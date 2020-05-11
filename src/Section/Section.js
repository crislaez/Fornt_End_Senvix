import React from 'react';
//css
import './Section.css';
//componentes
import Aside from '../Aside/Aside'
import Login from '../Login/Login'
import Registrarse from '../Registrarse/Registrarse'

class Section extends React.Component{

    render(){

        return(
            <section>
                <Aside aparecerMenu={this.props.aparecerMenu}></Aside>

                {
                    this.props.ventanaLogin
                    ?
                    <Login funcionAparecerDesaparecerLogin={this.props.funcionAparecerDesaparecerLogin}></Login>
                    :
                    <div></div>
                }

                {
                    this.props.ventanaRegistro
                    ?
                    <Registrarse funcionAparecerDesaparecerRegistro={this.props.funcionAparecerDesaparecerRegistro}></Registrarse>
                    :
                    <div></div>
                }
            </section>
        )
    }
}

export default Section;