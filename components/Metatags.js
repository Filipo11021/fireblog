import Head from "next/head";

const Metatags = ({
  title = "fireblog",
  description = "blogging platform",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default Metatags;
