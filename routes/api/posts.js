const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
// const checkObjectId = require('../../middleware/checkObjectId';
const imageToBase64 = require('image-to-base64');
const fs = require('fs');
path = require('path')



// Upload Endpoint
router.post('/upload',auth, async(req, res) => {
  if (req.files === null) {
    console.log('erroer hai')
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const id = req.user.id
  let reqPath = path.join(__dirname, '../../client2/public');
  var dir = `${reqPath}/uploads/${id}`;

  // console.log('dir',dir)
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  const file = req.files.file;
  // console.log('dsfsdfdsfsdf')
  // console.log(req.body.cap)
  file.mv(`${reqPath}/uploads/${id}/${file.name}`, err => {
    if (err) {
      // console.error(err);
      return res.status(500).send(err);
    } 

    

    
  });

  try{
    const user = await User.findById(req.user.id).select('-password');
    // console.log(user)

      const newPost = new Post({
        text: req.body.cap,
        name: user.name,
        avatar: `/uploads/${id}/${file.name}`,
        user: req.user.id
      });

      await newPost.save();

  //     // res.json(post);
      res.json({ fileName: file.name, filePath: `/uploads/${id}/${file.name}` });
  //     res.json({ fileName: file.name, filePath: `//.jpg` });
  }catch(err){
    console.error(err.message);
      res.status(500).send('Server Error');
  }
});



//geet post user
router.get('/user', auth ,async(req,res) =>{
  try{
    const users = await User.findById(req.user.id).select('following')

    let results = [...users.following ,{user: req.user.id}]

    console.log(results)
    let final =[]
    for(var i=0;i<results.length;i++){
      const posts = await Post.find({user: results[i].user})
      for(var j=0;j<posts.length;j++ ){
        // let reqPath = path.join(__dirname, '../..');
        //  const img = await fs.readFileSync(`${reqPath}${posts[j].avatar}`);
        //  console.log(img)
        //  final.push(
          //  _id:posts[j]._id,
          //  name:posts[j].name,
          //  avatar:img,
          //  likes:posts[j].likes,
          //  comments:posts[j].comments,
          //  date:posts[j].date,
          //  text:posts[j].text,
          //  user:posts[j].user
        // posts[j]

        //  )
        final.push(posts[j])

      }
    }
    res.json(final)

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  } 

})


// @route    POST api/posts
// @desc     Create a post
// @access   Private
// router.post(
//   '/',
//   auth,
//   async (req, res) => {
   

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPost = new Post({
//         text: req.body.text,
//         name: user.name,
//         // avatar: user.avatar,
//         user: req.user.id
//       });

//       const post = await newPost.save();

//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
      // console.log(posts)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//get all post of current user
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({user:req.user.id}).sort({ date: -1 });
    res.json(posts);
    // console.log(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth , async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
      }
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id',auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length>0) {
         // remove the like
      const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)

      post.likes.splice(removeIndex,1);
      await post.save();
      return res.json(post.likes);
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)

      post.likes.splice(removeIndex,1);

      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private

router.post(
    '/comment/:id',
   auth,
    async (req, res) => {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        // console.log(user)
        const post = await Post.findById(req.params.id);
        // console.log(post)
        const {text} =req.body

        console.log(text,'ytesa')
        const newComment = {
          text: text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
      console.log(removeIndex);
      post.comments.splice(removeIndex,1);
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });

module.exports =router;