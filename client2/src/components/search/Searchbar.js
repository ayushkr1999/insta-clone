import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Search.css'
import { useState } from 'react';
import {connect} from 'react-redux';
import {getProfiles,clearfun ,follow} from '../../actions/profile'
import { useEffect } from 'react';
// import { CLEAR_PROFILE } from '../../actions/types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 100,
    },
  },
}));
const Searchbar = ({ getProfiles, clearfun,follow,profile:{profiles}}) => {
    const classes = useStyles();
    const [text ,setText] = useState('')
    // const [profi ,setProfiles] = useState([])
    
    // useEffect(() =>{
    //     setProfiles(profiles)
    // })

    
        
    console.log(text)
    return (
        <Fragment >
        <div className='container4'>
          <ClearIcon onClick={(e) => clearfun(e)} />
          <TextField placeholder="Search" className='wid' onChange={(e) => {setText(e.target.value);
    if(e.target.value.length == 4 ){
        getProfiles(text)
        
    }
    if(e.target.value.length == 0 ){
        clearfun()
        
    }
}
        } id="standard-basic"  />
        <SearchIcon onClick={(e) => (console.log('yes'), 
        
            getProfiles(text)
         ) } />
         
        </div>
        {profiles.map((prof) => <div className='cardwid'>
                <img className='carditem1' src={prof.avatar}>
                    

                </img>
                <div className='carditem2'>
                    {prof.name}
                    
                </div>

                <button onClick={(e) => follow(prof._id)} className='btn btn-primary carditem3' >Follow</button>
            </div>)}
        </Fragment >
    )
}

Searchbar.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    follow:PropTypes.func.isRequired,
    clearfun:PropTypes.func.isRequired,
}
const mapStateToProps = (state) =>({
    profile:state.profile
})

export default connect(mapStateToProps,{ getProfiles,clearfun ,follow})(Searchbar)
