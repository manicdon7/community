const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000/',
  'https://community-dashboard.vercel.app/'

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  name: String,
  messages: Number,
  isActive: Boolean,
});

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: Date,
});

const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);

const mockUsers = [
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f90'), name: 'David', messages: 15, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f91'), name: 'Eva', messages: 8, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f92'), name: 'Frank', messages: 12, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f93'), name: 'Grace', messages: 20, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f94'), name: 'Hannah', messages: 4, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f95'), name: 'Isaac', messages: 6, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f96'), name: 'Jack', messages: 11, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f97'), name: 'Kira', messages: 9, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f98'), name: 'Liam', messages: 14, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f99'), name: 'Mia', messages: 5, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9a'), name: 'Noah', messages: 7, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9b'), name: 'Olivia', messages: 18, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9c'), name: 'Paul', messages: 3, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9d'), name: 'Quinn', messages: 10, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9e'), name: 'Riley', messages: 13, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9f'), name: 'Sophia', messages: 21, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa0'), name: 'Tyler', messages: 16, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa1'), name: 'Uma', messages: 2, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa2'), name: 'Victor', messages: 8, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa3'), name: 'Wendy', messages: 5, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa4'), name: 'Xander', messages: 9, isActive: false },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa5'), name: 'Yara', messages: 11, isActive: true },
    { _id: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa6'), name: 'Zane', messages: 7, isActive: true },
  ];
  
  const mockMessages = [
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f90'), text: 'How’s everyone doing?', createdAt: new Date('2024-07-31T10:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f91'), text: 'I’m doing great, thanks!', createdAt: new Date('2024-07-31T11:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f92'), text: 'Any plans for the weekend?', createdAt: new Date('2024-07-31T12:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f93'), text: 'Looking forward to the hike!', createdAt: new Date('2024-07-31T13:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f94'), text: 'Just finished a book, it was amazing.', createdAt: new Date('2024-07-31T14:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f95'), text: 'Who’s up for a movie night?', createdAt: new Date('2024-07-31T15:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f96'), text: 'Can’t wait for the new game release!', createdAt: new Date('2024-07-31T16:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f97'), text: 'I’ll be traveling next week.', createdAt: new Date('2024-07-31T17:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f98'), text: 'Got a new job, very excited!', createdAt: new Date('2024-08-01T09:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f99'), text: 'My cat just had kittens!', createdAt: new Date('2024-08-01T10:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9a'), text: 'Need recommendations for a good book.', createdAt: new Date('2024-08-01T11:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9b'), text: 'Thinking of redecorating my room.', createdAt: new Date('2024-08-01T12:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9c'), text: 'Just made a new recipe, it’s delicious!', createdAt: new Date('2024-08-01T13:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9d'), text: 'Had a great workout today.', createdAt: new Date('2024-08-01T14:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9e'), text: 'Can’t believe how fast the year is going.', createdAt: new Date('2024-08-01T15:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f9f'), text: 'Excited for the concert this weekend!', createdAt: new Date('2024-08-01T16:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa0'), text: 'Started learning a new language.', createdAt: new Date('2024-08-01T17:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa1'), text: 'I’m feeling quite nostalgic today.', createdAt: new Date('2024-08-01T18:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa2'), text: 'Looking forward to the long weekend.', createdAt: new Date('2024-08-01T19:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa3'), text: 'Trying out a new hobby, painting.', createdAt: new Date('2024-08-01T20:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa4'), text: 'Hoping for good weather this weekend.', createdAt: new Date('2024-08-01T21:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa5'), text: 'Just finished a big project at work.', createdAt: new Date('2024-08-01T22:00:00Z') },
    { userId: new mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8fa6'), text: 'Planning a surprise party for a friend.', createdAt: new Date('2024-08-01T23:00:00Z') },
  ];

const seedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.insertMany(mockUsers);
  }

  const messageCount = await Message.countDocuments();
  if (messageCount === 0) {
    await Message.insertMany(mockMessages);
  }
};

seedData();

app.get('/', (req, res) => {
    res.send('Server is working!');
  });

app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(`Received userId: ${userId}`);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }
  
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    console.log(`Converted objectId: ${objectId}`);
    const user = await User.findById(objectId);
    console.log(`User found: ${user}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const messages = await Message.find({ userId: objectId });
    console.log(`Messages found: ${messages}`);
  
    // Return combined user details and messages
    res.json({ user, messages });
  } catch (err) {
    console.error(`Error fetching user data: ${err.message}`);
    res.status(500).json({ message: 'Error fetching user data', error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.get('/api/messages/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(`Received userId: ${userId}`);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }
  
  try {

    const objectId = new mongoose.Types.ObjectId(userId);
  
    const messages = await Message.find({ userId: objectId });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this user' });
    }
  
    res.json(messages);
  } catch (err) {
    console.error(`Error fetching messages for user ${userId}:`, err);
    res.status(500).json({ message: 'Error fetching messages for user' });
  }
});

app.get('/api/messages/test', async (req, res) => {
  try {
    const objectId = mongoose.Types.ObjectId('64b2d587d8f87c15e6cf8f93'); // Replace with a valid ObjectId
    const messages = await Message.find({ userId: objectId });
  
    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this user' });
    }
  
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages for test user:', err);
    res.status(500).json({ message: 'Error fetching messages for test user' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error creating message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
