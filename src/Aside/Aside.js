import React from 'react';
//css
import './Aside.css';

class Aside extends React.Component{

    render(){

        return(
            <aside style={{width:this.props.aparecerMenu}}>
            </aside>
        )
    }
}

export default Aside;