import React, { Fragment, useEffect ,useState } from 'react'
import PropTypes from 'prop-types'
import './Search.css'
import axios from 'axios'

const SearchDefaults = props => {
    const [posts,setPosts] = useState([])
    useEffect(async() =>{
        const res =await axios.get('/api/posts/');

        setPosts(res.data);

    },[])
    
    return (
        <Fragment >
        <br></br>
        <br></br>
        <div className='ser_container'>
            {
            posts.map((post) => 
                <div className='ser_block'><img className='ser_image' src={post.avatar}></img> </div>
            )
            }
        </div>
        </Fragment>
    )
}

SearchDefaults.propTypes = {

}

export default SearchDefaults
