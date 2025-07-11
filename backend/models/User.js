import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: Number, required: true },
  base1: { type: Number, default: 0 },
  base2: { type: Number, default: 0 },
  base3: { type: Number, default: 0 },
  base4: { type: Number, default: 0 },
  base5: { type: Number, default: 0 },
  base6: { type: Number, default: 0 },
  time1: { type: Date },
  time2: { type: Date },
  time3: { type: Date },
  time4: { type: Date },
  time5: { type: Date },
  time6: { type: Date },
  total: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema); 