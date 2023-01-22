import React, { Component } from 'react';
import SpringSprite from './Resources/Spring_2.0.gif'
import springStyle from './Styles/Spring.module.css'

class Spring extends Component {
    state = {  } 
    render() { 
        return <img src={SpringSprite} className={springStyle.springDickson}></img>;
    }
}
 
export default Spring;