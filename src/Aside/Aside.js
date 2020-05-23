import React from 'react';
//css
import './Aside.css';
//alert
import sweet from 'sweetalert';
//services
import FuncionesFetch from '../services/services';

class Aside extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                buscadorUsuario:'',
                arrayUsuariosEncontrados:[]
            }
    }

    hadnelSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.buscadorUsuario)
        if(!this.state.buscadorUsuario){
            sweet('Oops','Rellene el nombre correctamente','error');
        }
        else{         
            FuncionesFetch.getUserByName(this.state.buscadorUsuario)   
            .then(response =>{
                if(response.data.toString()){
                  this.setState({arrayUsuariosEncontrados:response.data});
                }else{
                    sweet('Oops','No se encontro el usuario','error');
                }
                
            })
        }        
        this.setState({buscadorUsuario:''});
    }

    handleClick = (event) => {
        let id = event.target.parentNode.dataset.codigo;

        //llamamos a la funcion que esta en app.js para pasarle el nombre del usuario a buscar
        const handleClickAsideBuscadorPerfil = this.props.handleClickAsideBuscadorPerfil;

         //llamamos a la funcion getVideo name qeu esta en la carpeta services
        FuncionesFetch.getVideoName(id)
        .then(response => {

            if(response.data.toString()){
            
                handleClickAsideBuscadorPerfil(response.data);                   
            }
            else{
                FuncionesFetch.getUserById(id)
                .then(response => handleClickAsideBuscadorPerfil(response.data))
                .catch(err => console.log(err))
            }
            //llamamos a la funcion que esta en app.js para cerrar el menu buscador
            const funcionAparecerMenuLateral = this.props.funcionAparecerMenuLateral
            funcionAparecerMenuLateral();
            
            this.setState({arrayUsuariosEncontrados:[]})
        })
        .catch(err => console.log(err));
    }

    render(){

        console.log(this.state.arrayUsuariosEncontrados)
        return(
            <aside style={{width:this.props.aparecerMenu}}>
                <form onSubmit={this.hadnelSubmit} action='' method='' encType='multipart/form-data'>
                    <input type='text' value={this.state.buscadorUsuario} onChange={(params) => {this.setState({buscadorUsuario: params.target.value})}} placeholder='busca un usuario...'></input>
                    <input type='submit' value='Buscar'></input>
                </form>

                {
                    this.state.arrayUsuariosEncontrados.toString()
                    ?
                    this.state.arrayUsuariosEncontrados.map( (dato, key) => {
                        return(
                            <div className='divUsuarioBuscado' key={key} data-codigo={dato.id_usuario}>
                                <div className='divUsuarioBuscadoImagen'>
                                    <img src={dato.avatar} alt={dato.avatar}></img>
                                </div>
                                <p>{dato.nombre}</p>
                                <input type='button' value='Ver perfil' onClick={this.handleClick}></input>
                            </div>
                        )
                    })
                    :
                    <div style={{display:'none'}}></div>
                }
                
            </aside>
        )
    }
}

export default Aside;