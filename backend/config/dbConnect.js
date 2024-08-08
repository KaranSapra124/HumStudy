const mongoose = require('mongoose');

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {}).then(async () => {
    console.log('Connected to db');
  }).catch((err)=>{
console.log(err)
  })
};

module.exports = dbConnect;
