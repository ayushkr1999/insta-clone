import React from 'react'
import PropTypes from 'prop-types'
import './Header.css'
// import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ChatIcon from '@material-ui/icons/Chat';
import ClearIcon from '@material-ui/icons/Clear';
import { Redirect, useHistory } from 'react-router-dom';
const Header = props => {
    let history = useHistory();
    const red =(e) =>{
        console.log('ysad')
         return history.push('/dashboard')
    }

    return (
        <div className='container1' >
            <div onClick={(e) =>  red(e)} className='icon1'><ClearIcon  /></div>
            
            <h4>Comments</h4>
            
            <div className='icon2'><ChatIcon /></div>
        </div>
    )
}

Header.propTypes = {

}

export default Header
