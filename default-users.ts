const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:sDNuDXpBu0N7Ufow@cluster0.ih4o9.mongodb.net/angular-todo?retryWrites=true&w=majority&appName=Cluster0';

async function insertUsers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('angular-todo');
    const collection = db.collection('todo-users');

    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'john_doe',
        password: 'john123'
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'jane_doe',
        password: 'jane123'
      },
      {
        firstName: 'Jake',
        lastName: 'Doe',
        username: 'jake_doe',
        password: 'jake123'
      }
    ];

    const result = await collection.insertMany(users);
    console.log(`${result.insertedCount} users inserted successfully`);
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    await client.close();
  }
}

insertUsers();
