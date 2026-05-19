const mongoose = require('mongoose');

const connectDB = async () => {
  const tryMongoMemoryServer = async () => {
    try {
      console.log('🔄 Attempting to start in-memory MongoDB fallback...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      await mongoose.connect(mongoUri);
      console.log(`✅ In-Memory MongoDB Connected: fallback database is ready (Data will not persist across restarts).`);
    } catch (fallbackError) {
      console.error(`❌ In-Memory MongoDB also failed: ${fallbackError.message}`);
    }
  };

  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<YOUR_USER>')) {
    console.warn('⚠️  MONGO_URI is not configured. Please update server/.env with your MongoDB Atlas URI.');
    if (process.env.NODE_ENV === 'development') {
      await tryMongoMemoryServer();
    }
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Tip: Check your MONGO_URI in server/.env and ensure your IP is whitelisted in Atlas.');
    // Fallback to in-memory server if it fails
    if (process.env.NODE_ENV === 'development') {
      await tryMongoMemoryServer();
    }
  }
};

module.exports = connectDB;
