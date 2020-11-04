import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import './Dashboard.css'
// import { authorize } from 'passport';
import  {Link} from 'react-router-dom'
// import pic3 from './pic2.jpg';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addLike,addComment } from '../../actions/post';
import { TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    // Width: '702px',
    // height: '1000px',
    width:'702px'
  },
  media: {
    // height: 600,
    // width: 'auto',
    // height:'auto',
    maxHeight:'700px',
    maxWidth:'700px',
    objectFit: 'fill',
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  fit:{
    maxHeight:'700px',
    maxWidth:'700px',
      objectFit:'contain'
    //   overflow:'hidden'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: '80%',
    // paddingBottom: 10
  },

  wrap:{
    display:'flex'

  }


}));

const Post = ({name ,cap , id,image,likes, comments ,date ,addLike ,addComment}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [text,setText] = useState('')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const val = '';

  
  // console.log(URL.createObjectURL(image.data))
  // console.log(text)
  return (
      <div className='container2'>   
       <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={date}
      />
      <div className={classes.fit}>
      <img
        className={classes.media}
        // src={URL.createObjectURL(image.data)}
        // src={require(`../../../../${image}`)}
        src={image}
        alt=''
      />
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {cap}
        </Typography>
      
      </CardContent>
      
      <CardActions disableSpacing>
      
        <IconButton aria-label="add to favorites">
       
    
      <FavoriteIcon onClick={(e) => addLike(id)}/>
     
        </IconButton>
        {' '}{' '}{ likes>0 ? likes: null}{' '}
        <Link to={`/post/${id}`}>
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
        </Link>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      <CardContent className={classes.wrap} >
        <TextField onChange={(e) => setText(e.target.value) } className={classes.textField}
  placeholder="Add comment"></TextField>{' '}{' '}
        <button onClick={(e) => (addComment(id,text),setText(''))} className='btn btn-primary'>Post</button>
      </CardContent>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
    {/* <br></br> */}
    </div>

  );
}

// Post.prototype

Post.propTypes = {
  addLike:PropTypes.func.isRequired,
  addComment:PropTypes.func.isRequired,
}

export default connect(null,{addLike,addComment})(Post)