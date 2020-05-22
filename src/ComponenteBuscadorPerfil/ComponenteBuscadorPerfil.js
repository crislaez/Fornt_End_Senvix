import React from 'react';
//css
import './ComponenteBuscadorPerfil.css';
//componente
import ComponenteVideo from '../ComponenteVideo/ComponenteVideo';
//alert
import sweet from 'sweetalert';
class ComponenteBuscadorPerfil extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayUsuarioBuscado:[],
                usuario:'',
                avatar:'',
                banner:'',
                id_usuario:'',
                bSeguir:'',
                bDejarSeguir:'',
                colorBseguir:'',
                colorBDejarSeguir:'',
                verBotonMensaje:false
            };

    }

    componentDidMount(){
        this._isMount = true;
        this.setState({arrayUsuarioBuscado:this.props.usuario, usuario:this.props.usuario[0].nombre, id_usuario:this.props.usuario[0].id_usuario,  avatar:this.props.usuario[0].avatar, banner:this.props.usuario[0].banner});
        this.functionFecht();
    }

    componentDidUpdate(prevProps){
        if(this.props.usuario !== prevProps.usuario){
            this.setState({arrayUsuarioBuscado:this.props.usuario, usuario:this.props.usuario[0].nombre, id_usuario:this.props.usuario[0].id_usuario, avatar:this.props.usuario[0].avatar, banner:this.props.usuario[0].banner})
            this.functionFecht();
        }        
    }

    //esta funcion es para comprobar si se siguen los usuarios para desabilitar el boton o no
    functionFecht = () => {
        let data = new URLSearchParams(`seguido=${this.props.usuario[0].id_usuario}&seguidor=${localStorage.getItem('primariKey')}`);

        fetch('http://localhost:3001/api/checkFollow',{method:'POST', body:data})
        .then(data => data.json())
        .then(response => {
            if(response.data.toString()){
                console.log('Siguiendo');
                this.setState({bSeguir:true, bDejarSeguir:false, colorBseguir:'#282c34', colorBDejarSeguir:'#61dafb', verBotonMensaje:true });          
            }else{
                console.log('No siguiendo');
                this.setState({bSeguir:false, bDejarSeguir:true, colorBseguir:'#61dafb', colorBDejarSeguir:'#282c34',verBotonMensaje:false});               
            }
        })
        .catch(err => console.log(err.message))
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleCLick = (event) => {
        //primero comprobamos que siguan esistiendo esas variables en el localStorage por si el usuario las borra
        if(localStorage.getItem('primariKey') && localStorage.getItem('nombreUsuario')){
            if(event.target.id === 'bSeguir'){
                
                let data = new URLSearchParams(`seguido=${this.props.usuario[0].id_usuario}&seguidor=${localStorage.getItem('primariKey')}&id_seguimiento='' `);
                
                fetch('http://localhost:3001/api/follow',{method:'POST', body:data})
                .then(data => data.json())
                .then(response => {
                    console.log(response.success);
                    sweet('Ok','Ahora le sigues','success');
                    this.functionFecht();
                })
                .catch(err => err.message)
            }
            else{
                console.log('has dejado de seguir');               

                sweet({
                    text: "Seguro que quieres dejar de seguirle?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {

                        let data = new URLSearchParams(`seguido=${this.props.usuario[0].id_usuario}&seguidor=${localStorage.getItem('primariKey')} `);
                        fetch('http://localhost:3001/api/unFollow',{method:'DELETE', body:data})
                        .then(data => data.json())
                        .then(response => {
                            console.log(response);
                            sweet('Ok','Ya no le sigues','success');
                            this.functionFecht();
                        });

                        sweet("Cerrado sesion correctamente", {
                        icon: "success",
                      });
                    }
                  });
            } 
        }else{
            sweet('Oops','Debes estar logueado','error');
        }
    }
    
    //llamamos a la funcion que esta en app funcionChat
    handleCLickChat = () => {
        let usuario = 
            {
                nombre:this.props.usuario[0].nombre,
                indice:this.props.usuario[0].id_usuario
            }
        const funcionChat = this.props.funcionChat;
        funcionChat(usuario);
    }

    render(){
        // console.log(this.state.arrayUsuarioBuscado);
        // console.log(this.state.usuario);
        // console.log(this.state.avatar);
        // console.log(this.state.banner);

        return(
            <article className='articleBuscador'>
                <div className='divBannerBuscador' style={{ background: `url(${this.state.banner}) 0 0/100% 270px` }}>
                    <div className='divFotoBuscador'>
                        <img src={this.state.avatar} alt={this.state.avatar}></img>                        
                    </div>
                    <div className='divTituloBuscador'>
                        <p><strong>{this.state.usuario}</strong></p>
                    </div>

                    <div className='divBotonesBuscador'>
                        <input id='bSeguir' type='button' value='Seguir' disabled={this.state.bSeguir} style={{background:`${this.state.colorBseguir}`}} onClick={this.handleCLick}></input>
                        <input id='bDejarSeguir' type='button' value='Dejar de seguir' disabled={this.state.bDejarSeguir} style={{background:`${this.state.colorBDejarSeguir}`}} onClick={this.handleCLick}></input>
                        {
                            this.state.verBotonMensaje
                            ?
                            <input type='button' value='Enviar mensaje' onClick={this.handleCLickChat}></input>
                            :
                            <div style={{display:'none'}}></div>
                        }
                        
                    </div>
                    
                </div>

                <div className='divContenedorBuscador'>
                    {
                        this._isMount && this.state.arrayUsuarioBuscado.toString() && this.state.arrayUsuarioBuscado[0].id_video 
                        ?
                        this.state.arrayUsuarioBuscado.map( (dato, key) => {
                            return(
                                <ComponenteVideo 
                                key={key} 
                                // id_usuario={dato.id_usuario} 
                                id_video={dato.id_video} 
                                video={dato.video} 
                                titulo_video={dato.titulo_video}
                                nombre={dato.nombre}
                                mostrarBotonBorrar={false}
                                // getFetch={this.getFetch}
                                handleClickInicioPerfil={this.props.handleClickInicioPerfil}
                                ></ComponenteVideo>
                            )
                        })
                        :
                        <div className='divNohayVideos'>
                            <h3>El usuario aun no ha subido ningun video</h3>
                        </div>
                    }
                </div>
            </article>
        )
    }
}

export default ComponenteBuscadorPerfil;