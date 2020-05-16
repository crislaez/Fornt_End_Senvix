import React from 'react';
//css
import './Aside.css';
//alert
import sweet from 'sweetalert';

class Aside extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                buscadorUsuario:''
            }
    }

    hadnelSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.buscadorUsuario)
        if(!this.state.buscadorUsuario){
            sweet('Oops','Rellene el nombre correctamente','error');
        }
        else{            
            fetch(process.env.REACT_APP_DATABASE_URL+'/getVideoName/'+this.state.buscadorUsuario,{method:'GET'})
            .then(data => data.json())
            .then(response => {
                if(response.data.toString()){
                    //llamamos a la funcion que esta en app.js para pasarle el nombre del usuario a buscar
                    const handleClickAsideBuscadorPerfil = this.props.handleClickAsideBuscadorPerfil;
                    handleClickAsideBuscadorPerfil(response.data);
                    //llamamos a la funcion que esta en app.js para cerrar el menu buscador
                    const funcionAparecerMenuLateral = this.props.funcionAparecerMenuLateral
                    funcionAparecerMenuLateral();
                }else{
                    sweet('Oops','No se encontro el usuario','error');
                }
            })
        }
        
        this.setState({buscadorUsuario:''});
    }

    render(){

        return(
            <aside style={{width:this.props.aparecerMenu}}>
                <form onSubmit={this.hadnelSubmit} action='' method='' encType='multipart/form-data'>
                    <input type='text' value={this.state.buscadorUsuario} onChange={(params) => {this.setState({buscadorUsuario: params.target.value})}} placeholder='busca un usuario...'></input>
                    <input type='submit' value='Buscar'></input>
                </form>
            </aside>
        )
    }
}

export default Aside;