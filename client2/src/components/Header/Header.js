import React from 'react'
import PropTypes from 'prop-types'
import './Header.css'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ChatIcon from '@material-ui/icons/Chat';
const Header = props => {
    return (
        <div className='container1'>
            <div className='icon1'><CameraAltIcon /></div>
            
            <img src='https://freepngimg.com/thumb/logo/70011-instagram-script-typeface-myfonts-user-logo-font.png'></img>
            
            <div className='icon2'><ChatIcon /></div>
        </div>
    )
}

Header.propTypes = {

}

export default Header
