const mongoose = require('mongoose');
const types = mongoose.Schema.Types;
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
  username: {
    type: types.String,
    required: true,
    unique: true
  },
  password: {
    type: types.String,
    required: true,
  },
  email: {
    type: types.String,
    required: true,
    unique: true,
  },
  roles: {
    type: types.Array,
    required: true,
    default: ['user'],
  }
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;