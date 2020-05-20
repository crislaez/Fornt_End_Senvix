import React from 'react';
//css
import './Seguidos.css';
//componente
import CajaSeguido from '../CajaSeguido/CajaSeguido';
class Seguidos extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arraySeguidos:[]
            }
    }

    componentDidMount(){
        this._isMount = true;
        this.getFetch();
    }

    componentDidUpdate(prevProps){
        if(this.props.arraySeguidos !== prevProps.arraySeguidos){
            this.getFetch();
         }        
     }

    getFetch = async () => {
        let arrayAuxioliarDatos = [];

        for await (let valor of this.props.arraySeguidos){
            let data = await fetch(process.env.REACT_APP_DATABASE_URL+'/userByIdLimit/'+valor.id_usuario_seguido, {method:'GET'})
            let response = await data.json()
            arrayAuxioliarDatos.push(response.data[0]);           
        }
        this.setState({arraySeguidos:arrayAuxioliarDatos});
    }

    render(){
        console.log(this.state.arraySeguidos);

        return(
            <div className='divSeguidos' style={{height:`${this.props.aparecerSeguidos}`}}>                  
                {
                    this._isMount && this.state.arraySeguidos.toString()
                    ?
                    this.state.arraySeguidos.map( (dato, key) => {
                        return(
                             <CajaSeguido key={key} id_usuario={dato.id_usuario} avatar={dato.avatar} nombre={dato.nombre} handleClickAsideBuscadorPerfil={this.props.handleClickAsideBuscadorPerfil} handleClicSeguido={this.props.handleClicSeguido} getFetch={this.props.getFetch}></CajaSeguido>
                        )
                    })
                    :
                    <div style={{display:'none'}}></div>
                }
            </div>
        )
    }
}

export default Seguidos;