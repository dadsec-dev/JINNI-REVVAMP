import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    let description = "Revamp Luxury Real Estates in seconds.";
    let ogimage = "/favicon.png";
    let sitename = "AI Luxury Revamped";
    let title = "AI Luxury Estate Revamp";

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={ogimage} />
          <meta name="twitter:image" content={ogimage} />
        </Head>
        <body className="bg-[#17181C] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
