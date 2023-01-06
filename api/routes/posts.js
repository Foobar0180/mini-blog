const router = require('express').Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const author = req.query.username;
    const categoryName = req.query.category;
    let posts;

    if (author) {
      posts = await Post.find({ author });
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const post = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json('You can only update your posts');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post) {
      if (post.username === req.body.username) {
        await post.delete();
        res.status(200).json('Post deleted successfully');
      } else {
        res
          .status(401)
          .json(`Unauthorised attempt to delete post with id ${postId}`);
      }
    } else {
      res.status(404).json('Post not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
