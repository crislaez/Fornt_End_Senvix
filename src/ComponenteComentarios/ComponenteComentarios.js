import React from 'react';
//css
import './ComponenteComentarios.css'

class ComponenteComentarios extends React.Component{
    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayVideo:'',
                arrayComentarios:''

            }
    }

    componentDidMount(){
        this._isMount = true;
        if(this._isMount){
            this.getFetcComponetes(process.env.REACT_APP_DATABASE_URL+'/getVideo/'+this.props.indiceComponenteComentarios,true)
        }
 
    }

    //funcion generica  fetch
    getFetcComponetes = (url,bool) => {
        fetch(url, {method:'GET'})
        .then(data => data.json())
        .then(response => {
            console.log(response.data[0]);
            console.log(JSON.stringify(response.data[0]))
            if(response.data){
                if(bool){
                    this.setState({arrayVideo:response.data[0]})
                }else{
    
                }
            }            
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        console.log(this.state.arrayVideo)
        // volverAlInicio
        // divCajaIzquierda
        // divCajaDerecha
        return(
            <article className='divComponeteComentarios'>
            
                <div className='divBotonAtraComponenteComentarios'>
                    <input type='button' value='ATRAS' onClick={this.props.volverAlInicio}></input>
                </div>

                <div className='divCajaIzquierda'>
                    <div className='divVideoComponeteComentarios'>
                        <video src={this.state.arrayVideo.video} controls></video>
                    </div>

                    <div className='divTituloCOmponenteComentarios'>
                        <h3>{this.state.arrayVideo.titulo_video}</h3>
                        <p>{this.state.arrayVideo.nombre}</p>
                    </div>
                </div>

                <div className='divCajaDerecha'>
                    <div className='divComentarios'>
                    </div>

                    <form action='' method='' encType='multipart/form-data'>
                    </form>
                </div>

            </article>
        );
    }
}

export default ComponenteComentarios;