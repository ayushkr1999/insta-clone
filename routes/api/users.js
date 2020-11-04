const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth =require('../../middleware/auth')
const User = require('../../models/User.js');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/',[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(email);

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      
      user = new User({
        name,
        email,
        avatar,
        password
      });
      
      console.log(user);
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('yes');
      // res.status(200).send("yes");
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('secretOrKey'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.get('/getusers/:name',auth, async(req,res) =>{
    try{
        var regexp = new RegExp("^"+ req.params.name);
        const users = await User.find({name:regexp}).select('name avatar')

        res.json(users);


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.put('/follow/:id',auth, async (req, res) => {
    try {
      const user1 = await User.findById(req.params.id);
      const user2 = await User.findById(req.user.id);
        
      // Check if the post has already been liked
      user1.followers.unshift({ user: req.user.id });
      user2.following.unshift({ user: req.params.id });
        
      await user1.save();
      await user2.save();
        
      return res.json({msg:'Done'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
