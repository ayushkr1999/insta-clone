import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import {connect} from 'react-redux'
// import { post } from 'request'
import { CircularProgress } from '@material-ui/core'
import './Comments.css'
import Footer from '../Header/Footer'
import Header from './Header'

const Comments = ({match ,post:{posts}}) => {
    
    const [comment,setComments] = useState() 
        // console.log(posts.filter((pos) => pos._id == match.params.id)[0])

        const val = (posts.filter((pos) => pos._id == match.params.id)[0])

    useEffect(() =>{
        console.log('id',match.params.id)
        setComments(posts.filter((pos) => pos._id == match.params.id)[0])
        const val =  (posts.filter((pos) => pos._id == match.params.id)[0])
        
    },[])


    console.log(comment,'comment')
    return posts.length > 0 ? (
        <div>
            <Header />
            <br></br>
            <br></br>
           {val.comments.map((com) => <div className='com-container'>
               <img className='com-avatar' src={com.avatar}></img>
    <div className='com-content'><b>{com.name}</b>{' '}{com.text}{com.text}{com.text}{com.text}{com.text}</div>

           </div> ) }
           <Footer />
        </div>
    ):<CircularProgress />
}

Comments.propTypes = {
    post:PropTypes.object
}
const mapStateToProps = (state) =>({
    post : state.post
})

export default connect(mapStateToProps)(Comments)
