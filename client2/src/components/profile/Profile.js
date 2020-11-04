import React from 'react'
import PropTypes from 'prop-types'
import UserInfo from './UserInfo'
import Posts from './Posts'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import Footer from '../Header/Footer'


const Profile = ({auth:{user}}) => {
    return (
        <div>
            <Header />
            <br></br>
            <br></br>
            <UserInfo name={user.name} image={user.avatar}  followers={user.followers} following={user.following}/>

            <Posts />
            <Footer />
        </div>
    )
}

Profile.propTypes = {
    auth:PropTypes.func.isRequired,
}

const mapStateToProps =(state) =>({
    auth:state.auth
})


export default connect(mapStateToProps)(Profile)
