const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Listing', ListingSchema);