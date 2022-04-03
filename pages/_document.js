import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head></Head>
        <body>
          <div id='overlays'></div>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
