import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: {type: String, required: true, trim: true, unique: true},
  password: {type: String, required: false, trim: true},
  email: {type: String, required: true, trim: true, unique: true},
  location: {type: String, trim: true, required: true},
  socialLoginOnly: {type: Boolean, default: false},
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model('User', userSchema);

export default User;
