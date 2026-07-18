
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  await db.collection('users').updateMany({}, { \: { isVerified: true } });
  
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test3@test.com', password: 'password123' })
  });
  
  let cookies = loginRes.headers.get('set-cookie');
  if (!cookies) {
    console.log('Login failed:', await loginRes.json());
    process.exit(1);
  }

  const tripRes = await fetch('http://localhost:5000/api/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    body: JSON.stringify({
      title: 'Test Trip',
      destination: 'Test Dest',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      budget: 'Moderate',
      travelers: 1,
      travelStyle: 'Relaxed',
      generatedData: {}
    })
  });
  console.log('Trip Response HTTP:', tripRes.status);
  console.log('Trip Body:', await tripRes.json());
  process.exit(0);
}
run();
