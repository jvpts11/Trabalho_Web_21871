import React, { Component } from 'react';
import backgroundImage from './Resources/red_sun_ultimate.gif'
import backgroundStyle from './Styles/Background.module.css'

class Background extends Component {
    state = {  } 
    render() { 
        return <img src={backgroundImage} className={backgroundStyle.background}></img>;
    }
}
 
export default Background;