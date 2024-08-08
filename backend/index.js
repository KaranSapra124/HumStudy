const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./config/dbConnect');
dbConnect();

const app = require('./app');
// server on port specified below
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});
