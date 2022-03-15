const mongoose = require('mongoose');


(async () => {
 
if (process.env.NODE_ENV === 'development') {
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Local DB Connection Successful!'));
} else {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
 
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful!'));
}
})();

module.exports = { mongoose };
