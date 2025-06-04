import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: String,
  dateRange: {
    start: Date,
    end: Date
  },
  temperature: String,
  humidity: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Weather', weatherSchema);
