import React from 'react';
//css
import './Seguidos.css';
//componente
import CajaSeguido from '../CajaSeguido/CajaSeguido';
class Seguidos extends React.Component{

    _isMount = false;
    _color = true

    constructor(props){
        super(props);
        this.state = 
            {
                arraySeguidos:[],
                indicesUsuarioSeguidos:[]
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
        let indices = []
        // console.log(this.props.arraySeguidos.length)
        if(this.props.arraySeguidos.length !== 0){
            //for asincrono
            for await (let valor of this.props.arraySeguidos){
                //aqui conseguimos el array con todos los usuarios a los que seguimos
                let data = await fetch(process.env.REACT_APP_DATABASE_URL+'/userByIdLimit/'+valor.id_usuario_seguido, {method:'GET'})
                let response = await data.json()
                arrayAuxioliarDatos.push(response.data[0]);   
                  
                //aqui conseguimos el ultimo mensaje que tenemos con ese usuario para saber quien a sido el ultimo quien e nviado el mensaje    
                let params = new URLSearchParams(`id_usuario_uno=${localStorage.getItem('primariKey')}&id_usuario_dos=${response.data[0].id_usuario}`);
                let data2 = await fetch(process.env.REACT_APP_DATABASE_URL+'/lastMessageChat/', {method:'POST', body:params})
                let reponse = await data2.json();
                indices.push(reponse.data[0]);
            }
            this.setState({arraySeguidos:arrayAuxioliarDatos, indicesUsuarioSeguidos:indices});
        }        
    }

    render(){
        console.log(this.state.arraySeguidos);
        console.log(this.state.indicesUsuarioSeguidos);

        return(
            <div className='divSeguidos' style={{height:`${this.props.aparecerSeguidos}`}}>                  
                {
                    this._isMount && this.state.arraySeguidos.toString()
                    ?
                    this.state.arraySeguidos.map( (dato, key) => {
                        //si el indice existe, ya que ql usuario puerde seguirse a asi mismo
                        if(this.state.indicesUsuarioSeguidos[key]){
                            //si el id_usuario_dos tiene tu indice de usuario significa que tu eres el ultimo en enviarle el mensaje
                            if(this.state.indicesUsuarioSeguidos[key].id_usuario_dos == localStorage.getItem('primariKey')){
                                //tu eres el ultimo que ha enviado el mensaje a ese usuario                              
                                this._color = true;                                                                
                                
                            }else{
                                //el otro usuario a sido el ultimo
                                this._color = false;
                            }
                        }
                        else{
                            this._color = false;
                        }
                        
                        return(                            
                             <CajaSeguido key={key} id_usuario={dato.id_usuario} avatar={dato.avatar} nombre={dato.nombre} handleClickAsideBuscadorPerfil={this.props.handleClickAsideBuscadorPerfil} handleClicSeguido={this.props.handleClicSeguido} getFetch={this.props.getFetch} funcionChat={this.props.funcionChat} color={this._color}></CajaSeguido>
                        )
                    })
                    :
                    <div className='vacio'><p>Aun no sigues a nadie</p></div>
                }
            </div>
        )
    }
}

export default Seguidos;