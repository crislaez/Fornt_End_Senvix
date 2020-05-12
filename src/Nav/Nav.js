import React from 'react';
//css
import './Nav.css';

class Nav extends React.Component{

    //bLoginOCerrarSesion
    render(){

        return(
            <nav>
                <input id='bMenu' className='flotarDerecha' type='button' value='MENU' onClick={this.props.funcionAparecerMenuLateral}></input>
                <input id='bInicio' className='flotarDerecha' type='button' value='INICIO' onClick={this.props.handleClickMenuNav}></input>
                {
                    this.props.botonPerfil
                    ?
                    <input id='bPerfil' className='flotarDerecha' type='button' value='PERFIL' onClick={this.props.handleClickMenuNav}></input>
                    :
                    <input type='button' value='' style={{display:'none'}}></input>

                }
               

                <input id='bRegistro' className='flotarIzquierda' type='button' value='REGISTRARSE' onClick={this.props.funcionAparecerDesaparecerRegistro}></input>
                {
                    !this.props.bLoginOCerrarSesion
                    ?
                    <input id='bLogin' className='flotarIzquierda' type='button' value='LOGIN' onClick={this.props.funcionAparecerDesaparecerLogin}></input>
                    :
                    <input id='bCerrarSesion' className='flotarIzquierda' type='button' value='CERRAR SESION' onClick={this.props.funcionMostrarLoginOCerrarSesion}></input>
                }          
            </nav>
        )
    }
}

export default Nav;