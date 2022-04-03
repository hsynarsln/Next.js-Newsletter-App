import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    //! her sayfada navbar yer alması için bu şekilde wrap ettik
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='Next JS events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
