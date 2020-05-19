import React from 'react';
//css
import './Seguidos.css';

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
            let data = await fetch('http://localhost:3001/api/user/'+valor.id_usuario_seguido, {method:'GET'})
            let response = await data.json()
            arrayAuxioliarDatos.push(response.data[0]);           
        }

        // console.log(arrayAuxioliarDatos)
        this.setState({arraySeguidos:arrayAuxioliarDatos});
    }

    render(){
        console.log(this.state.arraySeguidos);

        return(
            <div className='divSeguidos' style={{height:`${this.props.aparecerSeguidos}`}}>
                <input type='button' value='X' onClick={this.props.cerrarSeguidos}></input>      
                
            </div>
        )
    }
}

export default Seguidos;