import React from 'react';
//css
import './Registrarse.css';

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

        console.log(this.state.nombre)
        console.log(this.state.apellido)
        console.log(this.state.nacimiento)
        console.log(this.state.sexo)
        console.log(this.state.correo)
        console.log(this.state.clave)
        console.log(this.state.rClave)
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
                        <select onChange={(params) => {this.setState({sexo:params.target.value})}}>
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