const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

const borderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  originalSize: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  borders: [{
    points: [pointSchema],
    area: { type: Number, required: true },
    boundingRect: {
      x: Number,
      y: Number,
      width: Number,
      height: Number
    }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
borderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Border', borderSchema);