import mongoose from 'mongoose';

//import User from './user';
//import Message from './message';

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
};

//const models = { User, Message };

//export { connectDb };

//export default models;

module.exports = {
    connectDb
}