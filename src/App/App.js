import React from 'react';
//css
import './App.css';
//componentes
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';
//alert
import sweet from 'sweetalert';

class App extends React.Component{

    _bLoginOCerrarSesion = false;
    _aparecerMenu = false;

    constructor(props){
        super(props);
        this.state = 
            {
                cambioventana: 'bInicio',
                bLoginOCerrarSesion: false,
                aparecerMenu: '0%',
                ventanaLogin: false,
                ventanaRegistro: false,
                botonPerfil:false
            }
    }
    
    componentDidMount(){
        if(localStorage.getItem('primariKey') && localStorage.getItem('nombreUsuario')){
            this._bLoginOCerrarSesion = true;
           this.setState({botonPerfil: true, bLoginOCerrarSesion: true})
        }
    }

    //funcion para los los input del nav
    handleClickMenuNav = (event) => {
        // console.log(event.target.id);
        this.setState({cambioventana:event.target.id});
    }
    
    /**
     * funcion que mostrara el boton login o cerrar sesion dependiendo
     * de si el usuario esta logueado o no
     */
    funcionMostrarLoginOCerrarSesion = () => {
        if(!this._bLoginOCerrarSesion){
            this.setState({bLoginOCerrarSesion: true, botonPerfil:true});
            this._bLoginOCerrarSesion = true;
        }
        else{

            sweet({
                text: "Seguro que quieres cerrar sesion?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    //removemos las 2 varaibles que estan guardadas en el localStorage
                    localStorage.removeItem('primariKey');
                    localStorage.removeItem('nombreUsuario');
                    /**
                     * hacemos que aparezca el boton login pasandolo a false, desaparedca el boton perfil poniendolo a false
                     * y cambiamos el componente ventana a INICIO
                     */
                    this.setState({bLoginOCerrarSesion: false, botonPerfil:false, cambioventana:'bInicio'});
                    this._bLoginOCerrarSesion = false;
                    sweet("Cerrado sesion correctamente", {
                    icon: "success",
                  });
                }
              });
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
        this.setState({ventanaLogin: !this.state.ventanaLogin});
    }

    //funcion para ahcer que aparezca el componente registro
    funcionAparecerDesaparecerRegistro = () => {
        this.setState({ventanaRegistro: !this.state.ventanaRegistro});
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
                botonPerfil={this.state.botonPerfil}
                ></Nav>
                <Section 
                aparecerMenu={this.state.aparecerMenu}
                ventanaLogin={this.state.ventanaLogin}
                ventanaRegistro={this.state.ventanaRegistro}
                cambioventana={this.state.cambioventana}
                funcionAparecerDesaparecerLogin={this.funcionAparecerDesaparecerLogin}
                funcionAparecerDesaparecerRegistro={this.funcionAparecerDesaparecerRegistro}
                funcionMostrarLoginOCerrarSesion={this.funcionMostrarLoginOCerrarSesion}
                ></Section>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;