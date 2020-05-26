import React from 'react';
//css
import './Registrarse.css';
//encriptar clave
import CryptoJS from 'crypto-js/md5';
//alert
import sweet from 'sweetalert';
//services
import FuncionesFetch from '../services/services';
class Registrarse extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                nombre:'',
                apellido:'',
                nacimiento:'',
                sexo:'',
                correo:'',
                clave:'',
                rClave:'',
                avatar:'',
                banner:''
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let  hash = '';
        if(!this.state.nombre){
            sweet('Oops','Rellene el nombre correctamente','error');
        }
        else if(!this.state.apellido){
            sweet('Oops','Rellene el apellido correctamente','error');
        }
        else if(!this.state.nacimiento){
            sweet('Oops','Rellene la fecha de nacimiento correctamente','error');
        }
        else if(!this.state.sexo || this.state.sexo === '1'){
            sweet('Oops','Rellene el sexo correctamente','error');
        }
        else if(!this.state.correo){
            sweet('Oops','Rellene el correo correctamente','error');
        }
        else if(!this.state.clave){
            sweet('Oops','Rellene la clave correctamente','error');
          
        }
        else if(!this.state.rClave || this.state.rClave !== this.state.clave){
            sweet('Oops','Las contraseñas deven coincidir','error');
        }
        else if(!this.state.avatar){
            sweet('Oops','Selecciona un avatar','error');
        }
        else if(!this.state.banner){
            sweet('Oops','Selecciona el banner','error');
        }
        else{
            //encriptamos la clave
            hash = CryptoJS(this.state.clave);

            let formData = new FormData();
            formData.append('nombre', this.state.nombre);
            formData.append('apellido', this.state.apellido);
            formData.append('nacimiento', this.state.nacimiento);
            formData.append('sexo', this.state.sexo);
            formData.append('correo', this.state.correo);
            formData.append('clave', JSON.stringify(hash));
            formData.append('avatar', this.state.avatar);
            formData.append('banner', this.state.banner);
       
            FuncionesFetch.addUser(formData)
            .then(response => {
                sweet('Gracias por registrarse','registrado corrrectamente','success');
                //llamamos a la funcion para que se cierre la ventana de registro
                const funcionAparecerDesaparecerRegistro = this.props.funcionAparecerDesaparecerRegistro;
                funcionAparecerDesaparecerRegistro();

                //si no hay las 2 variables registradas ya en el localStrorage, no nos lleva a la vengana login
                if(!localStorage.getItem('primariKey') && !localStorage.getItem('nombreUsuario')){                    
                    //llamamos a la funcion para que se abra la ventana de login
                    const funcionAparecerDesaparecerLogin = this.props.funcionAparecerDesaparecerLogin;
                    funcionAparecerDesaparecerLogin();
                }          
            })   
            .catch(err => {console.log(err)})
        }

        this.setState({nombre:'', apellido:'', nacimiento:'', sexo:'', correo:'', clave:'', rClave:''});

        
    }


    render(){

        return(
            <div className='divRegistrarse'>

                <div className='contenedorRegistrarse'>

                    <div className='divTituloRegistro'>
                        <h2>REGISTRARSE</h2>
                        <input type='button' value='X' onClick={this.props.funcionAparecerDesaparecerRegistro}></input>
                    </div>

                    <form onSubmit={this.handleSubmit} action='' method='' encType='multipart/form-data'>
                        <input type='text' name='nombre' value={this.state.nombre} onChange={(params) => {this.setState({nombre:params.target.value})}} placeholder='nombre...'></input>
                        <br></br>
                        <input type='text' name='apellido' value={this.state.apellido} onChange={(params) => {this.setState({apellido:params.target.value})}} placeholder='apellido...'></input>
                        <br></br>
                        <input type='date' name='nacimiento' value={this.state.nacimiento} onChange={(params) => {this.setState({nacimiento:params.target.value})}} placeholder='nacimineto'></input>
                        <br></br>
                        <select name='sexo' value={this.state.sexo} onChange={(params) => {this.setState({sexo:params.target.value})}}>
                            <option value='1'>--Seleccione Sexo--</option>
                            <option value='hombre'>Hombre</option>
                            <option value='mujer'>Mujer</option>
                        </select>
                        <br></br>
                        <input type='email' name='email' value={this.state.correo} onChange={(params) => {this.setState({correo:params.target.value})}} placeholder='correo...'></input>
                        <br></br>
                        <input type='password' name='clave' value={this.state.clave} onChange={(params) => {this.setState({clave:params.target.value})}} placeholder='clave'></input>
                        <br></br>
                        <input type='password' name='clave' value={this.state.rClave} onChange={(params) => {this.setState({rClave:params.target.value})}} placeholder='repetir clave...'></input>
                        <br></br>
                        <label>Perfil:&nbsp; &nbsp;</label><input type='file' onChange={(params) => {this.setState({avatar:params.target.files[0]})}}></input>
                        <br></br>
                        <label>Banner:</label><input type='file' onChange={(params) => {this.setState({banner:params.target.files[0]})}}></input>
                        <br></br>
                        <input type='submit' value='Registrarse'></input>
                    </form>

                </div>

            </div>
        )
    }
}

export default Registrarse;