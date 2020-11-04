import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import Footer from '../Header/Footer'
import Post from './Post'
import { getPosts } from '../../actions/post'
import {connect} from 'react-redux'
// import { post } from 'request'
import CircularProgress from '@material-ui/core/CircularProgress';
const Dashboard = ({getPosts , post:{posts} }) => {
    
    useEffect(() =>{
        getPosts();
    },[])
    
    return posts.length > 0 ? (
        <Fragment>
            {/* navbar */}
            <Header />
        <br></br>
        <br></br>
        <br></br>
            {/* Display posts */}
            {posts.map((post,index) => <Post key={index}name={post.name} cap={post.text} id={post._id} image={post.avatar} likes={post.likes.length} comments={post.comments}  date={post.date}/>)}
            
            {/* {posts.map((post) => <h3>{post.name}</h3>)} */}
            {/* //footer */}
            <Footer />
        </Fragment>
    ) :(<Fragment><br></br><center><CircularProgress/></center> </Fragment>)
}

Dashboard.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}
const mapStateToProps = (state) =>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Dashboard)
