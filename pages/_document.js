import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="order-details" />
          <div id="add-new" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
