// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ten_database_cua_ban', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Đã kết nối MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
