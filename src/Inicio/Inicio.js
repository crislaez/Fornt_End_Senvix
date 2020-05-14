import React from 'react';
//css
import './Inicio.css'
//componentes
import ComponenteVideo from '../ComponenteVideo/ComponenteVideo'
class Inicio extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayVideos:[]
            }
    }

    componentDidMount(){
        this._isMount = true;
        //llamamos a la funcion qeu esta abajo para qeu carge el fetch
        this.getFetchAll(process.env.REACT_APP_DATABASE_URL+'/allVideo');
    }

    componentWillMount(){
        this._isMount = false;
    }

    //funcionFetch
    getFetchAll = (ruta) => {
        fetch(ruta, {method:'GET'})
        .then(data => data.json())
        .then(response => {
            console.log(response.data);
            this.setState({arrayVideos:response.data});
        })
    }

    render(){

        console.log(this.state.arrayVideos);
        return(
            <article className='divInicio'>
                <div className='divTituloInicio'>
                    <h2>INICIO</h2>
                </div>

                <div className='divContenidoInicio'>

                {
                    this.state.arrayVideos
                    ?
                    this.state.arrayVideos.map( (dato, key) => {
                        return(
                            <ComponenteVideo 
                            key={key} 
                            id_usuario={dato.id_usuario} 
                            id_video={dato.id_video} 
                            video={dato.video} 
                            titulo_video={dato.titulo_video}
                            mostrarBotonBorrar={false}
                            getFetch={this.getFetch}
                            margenParrafo={'30px'}
                            ></ComponenteVideo>
                        )
                    })
                    :
                    <div></div>
                }
                </div>
            </article>
        )
    }
}

export default Inicio;