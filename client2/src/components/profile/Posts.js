import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Post.css'
import axios from 'axios'
const Posts = props => {
    const [posts, setPosts ] = useState([])
    useEffect(async() =>{
        const res = await axios.get('/api/posts/me')

        setPosts(res.data)
    })

    return (
        <div className='pro_container'>
            {posts.map((post) => <div className='pro_block'>
                    <img className='pro_image' src={post.avatar} ></img>

                </div>
         )}       
        </div>
    )
}

Posts.propTypes = {

}

export default Posts
