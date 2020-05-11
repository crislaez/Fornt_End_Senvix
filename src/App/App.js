import React from 'react';
//css
import './App.css';
//componentes
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';

class App extends React.Component{

    _bLoginOCerrarSesion = false;
    _aparecerMenu = false;
    _vLogin = false;
    _vRegistro = false;

    constructor(props){
        super(props);
        this.state = 
            {
                cambioventana: 'bInicio',
                bLoginOCerrarSesion: false,
                aparecerMenu: '0%',
                ventanaLogin: false,
                ventanaRegistro: false
            }
    }
    

    //funcion para los los input del nav
    handleClickMenuNav = (event) => {
        console.log(event.target.id);
        this.setState({cambioventana:event.target.id});
    }
    
    /**
     * funcion que mostrara el boton login o cerrar sesion dependiendo
     * de si el usuario esta logueado o no
     */
    funcionMostrarLoginOCerrarSesion = () => {
        if(!this._bLoginOCerrarSesion){
            this.setState({bLoginOCerrarSesion: true});
            this._bLoginOCerrarSesion = true;
        }
        else{
            this.setState({bLoginOCerrarSesion: true});
            this._bLoginOCerrarSesion = false;
        }
    }

    //funcion para qeu aparezca el menu lateral o desaparezca
    funcionAparecerMenuLateral = () => {
        if(!this._aparecerMenu){
            this.setState({aparecerMenu:'25%'});
            this._aparecerMenu = true;
        }
        else{
            this.setState({aparecerMenu:'0%'});
            this._aparecerMenu = false;
        }
    }

    //funcion para que apacerza el componente Login
    funcionAparecerDesaparecerLogin = () => {
        if(!this._vLogin){
            this.setState({ventanaLogin:true});
            this._vLogin = true;
        }
        else{
            this.setState({ventanaLogin:false});
            this._vLogin = false;
        }
    }

    //funcion para ahcer que aparezca el componente registro
    funcionAparecerDesaparecerRegistro = () => {
        if(!this._vRegistro){
            this.setState({ventanaRegistro:true});
            this._vRegistro = true;
        }
        else{
            this.setState({ventanaRegistro:false});
            this._vRegistro = false;
        }
    }

    render(){

        return(
            <div>
                <Header></Header>
                <Nav 
                handleClickMenuNav={this.handleClickMenuNav}
                funcionMostrarLoginOCerrarSesion={this.funcionMostrarLoginOCerrarSesion}
                bLoginOCerrarSesion={this.state.bLoginOCerrarSesion}
                funcionAparecerMenuLateral={this.funcionAparecerMenuLateral}
                funcionAparecerDesaparecerLogin={this.funcionAparecerDesaparecerLogin}
                funcionAparecerDesaparecerRegistro={this.funcionAparecerDesaparecerRegistro}
                ></Nav>
                <Section 
                aparecerMenu={this.state.aparecerMenu}
                ventanaLogin={this.state.ventanaLogin}
                ventanaRegistro={this.state.ventanaRegistro}
                funcionAparecerDesaparecerLogin={this.funcionAparecerDesaparecerLogin}
                funcionAparecerDesaparecerRegistro={this.funcionAparecerDesaparecerRegistro}
                ></Section>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;