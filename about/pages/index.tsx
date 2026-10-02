import Head from "next/head";
import AboutPage from "../components/AboutPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>About us — metaruleX</title>
        <meta
          name="description"
          content="Meet the presentation and storytelling team helping innovation teams and global brands make their ideas clear."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AboutPage />
    </>
  );
}
