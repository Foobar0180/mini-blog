const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (isValid) {
        const { password, ...fields } = user._doc;
        res.status(200).json(fields);
      } else {
        res.status(400).json('Incorrect username or password');
      }
    } else {
      res.status(400).json('Incorrect username or password');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
