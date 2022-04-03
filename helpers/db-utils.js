import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = new MongoClient(process.env.MONGO_URL);

  return client;
}

export async function main(client, collection, document) {
  await client.connect();

  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  await client.connect();

  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
