import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
const Footer = props => {
    return (
        <div className='footer'>
           <Link className="link"  to={'/dashboard'}>
          <div className='eql' > <HomeIcon /></div></Link>
          <Link className="link"  to={'/search'}>
        <div  className='eql'> 
          <SearchIcon /></div></Link>
        <Link className="link" to={'/create/post'}>
        {/* <Link to={'./create/post'}>  */}
        <div className='eql'><ControlPointIcon /></div></Link>
        <Link className="link" to={'/notifiction'}>
        <div className='eql'><FavoriteIcon/></div></Link>
        <Link className="link" to={'/profile'}>
        <div className='eql'><AccountCircleIcon /></div></Link>

        </div>
    )
}

Footer.propTypes = {

}

export default Footer
