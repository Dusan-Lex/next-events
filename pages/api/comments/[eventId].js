import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://Lex:NiKa2019@cluster0.vn6er.mongodb.net/events?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }
    const newComment = { eventId, email, name, text };
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
};

export default handler;