import React from 'react';
//css
import './ComponenteBuscadorPerfil.css';

class ComponenteBuscadorPerfil extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                arrayUsuarioBuscado:[]
            };
    }

    componentDidMount(){
        this._isMount = true;
        this.setState({arrayUsuarioBuscado:this.props.usuario})
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        console.log(this.state.arrayUsuarioBuscado);

        return(
            <article>
         
            </article>
        )
    }
}

export default ComponenteBuscadorPerfil;