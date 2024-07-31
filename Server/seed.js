const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

mongoose.connect('mongodb+srv://manikandan05082003:Manicdon07%40@cluster0.scriurb.mongodb.net/communityDashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  await User.deleteMany({});
  await Message.deleteMany({});

  const users = await User.create([
    { name: 'Alice', messages: 10, isActive: true },
    { name: 'Bob', messages: 5, isActive: false },
    // Add more users as needed
  ]);

  await Message.create([
    { userId: users[0]._id, text: 'Hello, World!', createdAt: new Date() },
    { userId: users[1]._id, text: 'Hi there!', createdAt: new Date() },
    // Add more messages as needed
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData();
