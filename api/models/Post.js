const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: String,
    content: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      required: false,
    },
    coverImage: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
