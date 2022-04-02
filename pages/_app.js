import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    //! her sayfada navbar yer alması için bu şekilde wrap ettik
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
