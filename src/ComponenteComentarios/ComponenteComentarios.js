import React from 'react';
//css
import './ComponenteComentarios.css'
//alert
import sweet from 'sweetalert';
//services
import FuncionesFetch from '../services/services';
//Componente
import Comentario from '../Comentario/Comentario'
class ComponenteComentarios extends React.Component{
    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayVideo:'',
                arrayComentarios:'',
                comentario:'',
                usuario:'',

            }
    }

    componentDidMount(){
        this._isMount = true;
        if(this._isMount){
            this.getFetcComponetes(process.env.REACT_APP_DATABASE_URL+'/getVideo/'+this.props.indiceComponenteComentarios,true);
            this.getFetcComponetes(process.env.REACT_APP_DATABASE_URL+'/getComent/'+this.props.indiceComponenteComentarios,false);
            this.setState({usuario: localStorage.getItem('nombreUsuario')})
        }
 
    }

    //funcion generica  fetch
    getFetcComponetes = (url,bool) => {
        fetch(url, {method:'GET'})
        .then(data => data.json())
        .then(response => {
            // console.log(response.data[0]);
            // console.log(JSON.stringify(response.data[0]))
            if(response.data){
                if(bool){
                    console.log(response.data[0]);
                    this.setState({arrayVideo:response.data[0]})
                }else{
                    console.log(response.data);
                    this.setState({arrayComentarios:response.data})
                }
            }            
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.usuario){
            sweet('Oops','Debes estar logueado','error');
        }
        else if(!this.state.comentario){
            sweet('Oops','Escribe un comentario','error');
        }
        else{
            const data = new URLSearchParams(`id_video=${this.props.indiceComponenteComentarios}&id_comentario=${''}&comentario=${this.state.comentario}&usuario=${this.state.usuario}`);

            FuncionesFetch.addComent(data)
            .then(response => {
                sweet('Ok','Mensaje enviado','success');
                //volvemos a llamar a esta fucion fetch para cargar los comentarios
                this.getFetcComponetes(process.env.REACT_APP_DATABASE_URL+'/getComent/'+this.props.indiceComponenteComentarios,false);
            })
            .catch(err => console.log(err));
        }
        
        this.setState({comentario:''});   
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        // console.log(this.state.arrayVideo)

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
                    <div className='divCajaComentarios'>
                    {
                        this._isMount && this.state.arrayComentarios.toString()
                        ?
                        this.state.arrayComentarios.map( (dato, key) => {
                            return(
                                <Comentario key={key} id_comentario={dato.id_comentario} usuario={dato.usuario} comentario={dato.comentario}> </Comentario>
                            )
                        })
                        :
                        <div>No hay comentarios</div>
                    }
                    </div>

                    <form onSubmit={this.handleSubmit} action='' method='' encType='multipart/form-data'>
                        <input type='text' value={this.state.comentario} onChange={(params) => {this.setState({comentario: params.target.value})}} placeholder='deja tu comentario...'></input>
                        <input type='submit' value='Enviar'></input>
                    </form>
                </div>

            </article>
        );
    }
}

export default ComponenteComentarios;