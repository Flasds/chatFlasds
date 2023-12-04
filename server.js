// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 连接 MongoDB 数据库（请替换为你自己的数据库连接字符串）
mongoose.connect('mongodb://localhost/class_website', { useNewUrlParser: true, useUnifiedTopology: true });

// 定义学生模型
const Student = mongoose.model('Student', {
  name: String,
  rollNumber: String,
  email: String,
});

app.use(bodyParser.json());

// 获取所有学生
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 添加学生
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
