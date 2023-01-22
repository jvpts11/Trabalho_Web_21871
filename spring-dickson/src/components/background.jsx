import React, { Component } from 'react';
import background from './sprites/red_sun_ultimate.gif'

class Background extends Component {
    state = {  } 
    render() { 
        return <img src={background} alt='Background'></img>;
    }
}
 
export default Background;