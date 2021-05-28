import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Lex:NiKa2019@cluster0.vn6er.mongodb.net/events?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
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
