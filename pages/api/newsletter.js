import { connectDatabase, main } from '../../helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    //! mongodb connect
    let client;
    try {
      // Connection URL
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to database failed!' });
      return;
    }

    await main(client, 'emails', { email: userEmail })
      .then(res.status(201).json({ message: 'Signed up!' }))
      .catch(res.status(500).json({ message: 'Inserting data failed!' }));
    // .finally(() => client.close());

    console.log(userEmail);
  }
}

export default handler;
