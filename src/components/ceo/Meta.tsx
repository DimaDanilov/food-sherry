import Head from "next/head";

type MetaProps = {
  title: string;
  description?: string;
};

export const Meta = ({ title, description }: MetaProps) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icons/favicon.ico" />
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />
      {description ? (
        <>
          <meta name="description" content={description} />
          <meta
            property="og:description"
            content={description}
            key="description"
          />
        </>
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Head>
  );
};
