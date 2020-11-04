import React from 'react'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import {connect} from 'react-redux'
const UserInfo = ({name,image ,followers,following, logout}) => {
    return (
        <div className='bio_container'>
            <div className='first_row'>
                <img className='bio_image' src={image}></img>
               <div className='bio_wrapper'>
                <div className='bio_item1'>
                    <p>Followers</p>
    <p>{followers.length}</p>
                </div>
                <div className='bio_item2'>
                <p>Following</p>
    <p>{following.length}</p>
                </div>
                <div className='bio_item3'>
                <p>Posts</p>
    <p>4</p>
                </div>
                </div>
            </div>
            <div className='second_row'>
                {/* <p>{name}</p> */}
                {/* <p>My philosfy</p>
                <p>some bio</p>
                <p>some Bio</p>
                <p>some bio</p> */}
                <button onClick={(e) => logout()} className='btn btn-primary logout'>Logout</button>

            </div>
        </div>
    )
}

UserInfo.propTypes = {
    logout:PropTypes.func.isRequired,
}

export default connect(null,{ logout })(UserInfo)
