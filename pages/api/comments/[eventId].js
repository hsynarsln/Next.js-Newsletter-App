import { connectDatabase, getAllDocuments, main } from '../../../helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  //! mongodb connect
  let client;
  try {
    // Connection URL
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to database failed!' });
    return;
  }

  if (req.method === 'POST') {
    //! server-side validation
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    // console.log(email, name, text);

    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId
    };

    let result;

    try {
      result = await main(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'added comment', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Add comment to database failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    // const dummyList = [
    //   { id: 'c1', name: 'Joseph', text: 'A first comment' },
    //   { id: 'c2', name: 'Michy', text: 'A second comment' }
    // ];

    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Get comments failed!' });
      return;
    }
  }
}

export default handler;
