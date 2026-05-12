import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  streakDates: [
    {
      date: Date,
      focusTime: Number // in minutes
    }
  ]
}, { timestamps: true });

const Streak = mongoose.model('Streak', streakSchema);
export default Streak;
