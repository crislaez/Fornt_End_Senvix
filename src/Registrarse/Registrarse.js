import React from 'react';
//css
import './Registrarse.css';
//encriptar clave
import CryptoJS from 'crypto-js/md5';

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
                rClave:''
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let  hash = '';
        if(!this.state.nombre){
            alert('Rellene el nombre correctamente')
        }
        else if(!this.state.apellido){
            alert('Rellene el aleppido correctamente')
        }
        else if(!this.state.nacimiento){
            alert('Rellene la fecha de nacimiento correctamente')
        }
        else if(!this.state.sexo || this.state.sexo === '1'){
            alert('Rellene el sexo correctamente')
        }
        else if(!this.state.correo){
            alert('Rellene el correo correctamente')
        }
        else if(!this.state.clave){
            alert('Rellene la clave correctamente')
          
        }
        else if(!this.state.rClave || this.state.rClave !== this.state.clave){
            alert('Las contraseñas deven coincidir')
        }
        else{
            //encriptamos la clave
            hash = CryptoJS(this.state.clave);

            let usuario = 
                {
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    nacimiento: this.state.nacimiento,
                    sexo: this.state.sexo,
                    correo: this.state.correo,
                    clave:JSON.stringify(hash)
                };

            // console.log(usuario);    
            const data = new URLSearchParams(`nombre=${this.state.nombre}&apellido=${this.state.apellido}&nacimiento=${this.state.nacimiento}&sexo=${this.state.sexo}&correo=${this.state.correo}&clave=${JSON.stringify(hash)}`);

            fetch('http://localhost:3001/api/addUser',{method:'POST', body: data})
            .then(data => data.json())
            .then(response => {
                console.log(response);
                alert('registrado corrrectamente');
                //si no hay las 2 variables registradas ya en el localStrorage, no nos lleva a la vengana login
                if(!localStorage.getItem('primariKey') && !localStorage.getItem('nombreUsuario')){
                    //llamamos a la funcion para qeu se cierre la ventana de registro
                    const funcionAparecerDesaparecerRegistro = this.props.funcionAparecerDesaparecerRegistro;
                    funcionAparecerDesaparecerRegistro();
                    //llamamos a la funcion para que se abra la ventana de login
                    const funcionAparecerDesaparecerLogin = this.props.funcionAparecerDesaparecerLogin;
                    funcionAparecerDesaparecerLogin();
                }          
            })   
            .catch(err => {
                console.log(err.message)
            })
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
                        <input type='text' value={this.state.nombre} onChange={(params) => {this.setState({nombre:params.target.value})}} placeholder='nombre...'></input>
                        <br></br>
                        <input type='text' value={this.state.apellido} onChange={(params) => {this.setState({apellido:params.target.value})}} placeholder='apellido...'></input>
                        <br></br>
                        <input type='date' value={this.state.nacimiento} onChange={(params) => {this.setState({nacimiento:params.target.value})}} placeholder='nacimineto'></input>
                        <br></br>
                        <select value={this.state.sexo} onChange={(params) => {this.setState({sexo:params.target.value})}}>
                            <option value='1'>--Seleccione Sexo--</option>
                            <option value='hombre'>Hombre</option>
                            <option value='mujer'>Mujer</option>
                        </select>
                        <br></br>
                        <input type='email' value={this.state.correo} onChange={(params) => {this.setState({correo:params.target.value})}} placeholder='correo...'></input>
                        <br></br>
                        <input type='password' value={this.state.clave} onChange={(params) => {this.setState({clave:params.target.value})}} placeholder='clave'></input>
                        <br></br>
                        <input type='password' value={this.state.rClave} onChange={(params) => {this.setState({rClave:params.target.value})}} placeholder='repetir clave...'></input>
                        <br></br>
                        <input type='submit' value='Registrarse'></input>
                    </form>

                </div>

            </div>
        )
    }
}

export default Registrarse;