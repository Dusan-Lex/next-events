import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.vn6er.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
export const connectDatabase = async () => {
  const client = await MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  });
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, eventId) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray();
  return documents;
};
