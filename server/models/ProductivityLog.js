import mongoose from 'mongoose';

const productivityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  website: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['productive', 'non-productive', 'neutral'],
    default: 'neutral'
  },
  timeSpent: {
    type: Number,
    required: true // in seconds
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  scrollSpeed: Number,
  mouseMovement: Number,
  videoTitle: String
}, { timestamps: true });

const ProductivityLog = mongoose.model('ProductivityLog', productivityLogSchema);
export default ProductivityLog;
