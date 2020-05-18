import React from 'react';
//css
import './Login.css'
//encriotar clave
import CryptoJS from 'crypto-js/md5';
//alert
import sweet from 'sweetalert';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {                
                correo:'',
                clave:''             
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let hash;

        if(!this.state.correo){
            sweet('Oops','rellene el correo correctamente','error')
        }
        else if(!this.state.clave){
            sweet('Oops','rellene la clave correctamente','error')
        }
        else
        {
            //encriptamos la clave
            hash = CryptoJS(this.state.clave);

            const data = new URLSearchParams(`correo=${this.state.correo}&clave=${JSON.stringify(hash)}`)

            fetch(process.env.REACT_APP_DATABASE_URL+'/login', {method:'POST', body:data})
            .then(data => data.json())
            .then(response => {

                if(response.data.toString()){
                    sweet('Logueado','logueado correctamente','success');
                    localStorage.setItem('primariKey',response.data[0].id_usuario);
                    localStorage.setItem('nombreUsuario',response.data[0].nombre);
                    //llamamos a la funcion que esta en app.js para qeu desaparezca el boton login y aparezca el boton cerrar sesion
                    const funcionMostrarLoginOCerrarSesion = this.props.funcionMostrarLoginOCerrarSesion;
                    funcionMostrarLoginOCerrarSesion();
                    //llamamos a la funcion que esta en app.js para qeu se cierre el componente login
                    const funcionAparecerDesaparecerLogin = this.props.funcionAparecerDesaparecerLogin;
                    funcionAparecerDesaparecerLogin();
                    //llamamos a la funcion que esta en app.js para qeu nos redireccione a la pantalla inicio
                    const volverAlInicio = this.props.volverAlInicio;
                    volverAlInicio();
                }
                else{
                    sweet('Oops','Correo o clave incorrectos','error')
                }
            })            
            .catch(err => {
                console.log(err.message);
            })
        }
        this.setState({correo: '', clave: ''})
        
    } 

    render(){

        return(      
            <div className='divLogin'>

                <div className='contenedorLogin'>

                    <div className='divTituloLogin'>
                        <h2>LOGIN</h2>
                        <input type='button' value='X' onClick={this.props.funcionAparecerDesaparecerLogin}></input>
                    </div>

                    <form onSubmit={this.handleSubmit} action='' method='' encType='multipart/form-data'>
                        <input type='email' value={this.state.correo} onChange={(params) => {this.setState({correo:params.target.value})}} placeholder='correo...'></input>
                        <br></br>
                        <input type='password' value={this.state.clave} onChange={(params) => {this.setState({clave:params.target.value})}} placeholder='clave...'></input>
                        <br></br>
                        <input type='submit' value='Login'></input>
                    </form>
                </div>

            </div>            
        )
    }
}

export default Login;