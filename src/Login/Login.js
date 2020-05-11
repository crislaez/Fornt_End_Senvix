import React from 'react';
//css
import './Login.css'

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                nombre:'',
                apellido:'',
                nacimeinto:'',
                sexo:'',
                correo:'',
                clave:'',
                rClave:''
            }
    }
    handleSubmit = (event) => {

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
                        <input type='text' ></input>
                    </form>
                </div>

            </div>            
        )
    }
}

export default Login;