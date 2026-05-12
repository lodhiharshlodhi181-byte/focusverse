import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    name: {
      type: String,
      default: 'Neutral'
    },
    level: {
      type: Number,
      default: 1
    },
    expression: {
      type: String,
      enum: ['happy', 'tired', 'sick', 'energetic', 'neutral'],
      default: 'neutral'
    },
    health: {
      type: Number,
      default: 100,
      min: 0,
      max: 100
    }
  },
  stats: {
    totalFocus: { type: Number, default: 0 }, // in minutes
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastProductiveDate: { type: Date },
    noScrollStreak: { type: Number, default: 0 },
    weeklyChallenge: {
      goal: { type: Number, default: 1000 }, // goal in minutes
      progress: { type: Number, default: 0 }, // progress in minutes
      lastReset: { type: Date, default: Date.now }
    },
    totalXp: { type: Number, default: 0 },
    productiveHours: { type: Number, default: 0 },
    nonProductiveHours: { type: Number, default: 0 },
    healthScore: { type: Number, default: 100 },
    productivityScore: { type: Number, default: 0 },
    scrollSpeed: { type: Number, default: 0 },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedSites: [{
      url: String,
      mode: { type: String, enum: ['timer', 'blocked', 'monitored'], default: 'blocked' },
      timeLimit: { type: Number, default: 0 } // in minutes
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
