import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    const client = await MongoClient.connect(
      "mongodb+srv://Lex:NiKa2019@cluster0.vn6er.mongodb.net/events?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    );
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });
    client.close();
    console.log(userEmail);
    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
