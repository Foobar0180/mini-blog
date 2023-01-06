const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  if (req.body.userId === userId) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const u = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...fields } = u._doc;
      res.status(200).json(fields);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res
      .status(403)
      .json(`Unauthorised attempt to update user with id ${userId}`);
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  if (req.body.userId === userId) {
    try {
      const user = await User.findById(userId);
      if (user) {
        await Post.deleteMany({ userId });
        await User.findByIdAndDelete(userId);
        res.status(200).json('User deleted successfully');
      } else {
        res.status(404).json('User not found');
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res
      .status(403)
      .json(`Unauthorised attempt to delete user with id ${userId}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, ...fields } = user._doc;
      res.status(200).json(fields);
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
