import PrimarySection from "../../components/PrimarySection";
import ArticleCollection from "../../components/ArticleCollection";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=about&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

async function getArticleData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/Articles?fields=*.*.*&filter[status]=published&sort=sort`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function getStaticProps() {
  const [pageData, articles] = await Promise.all([
    getPageData(),
    getArticleData(),
  ]);
  return {
    props: {
      pageData,
      articles,
    },
    revalidate: 1,
  };
}

const index = ({ pageData, articles }) => {
  const router = useRouter();

  return (
    <>
      <main>
        <Head>
          <title>{pageData.title} | Portsmouth Housing Authority</title>
          <meta name="description" content={pageData?.meta_description} />

          {/* Open Graph */}
          <meta
            property="og:url"
            content={process.env.SITE_URL + router.asPath}
            key="ogurl"
          />
          <meta
            property="og:image"
            content={
              pageData?.header_image
                ? process.env.CMS_URL + "/assets/" + pageData?.header_image.id
                : process.env.SITE_URL +
                  "/img/portsmouth-housing_logo_horiz.png"
            }
            key="ogimage"
          />
          <meta
            property="og:site_name"
            content={"Portsmouth Housing Authority"}
            key="ogsitename"
          />
          <meta
            property="og:title"
            content={pageData.title + " - Portsmouth Housing Authority"}
            key="ogtitle"
          />
          <meta
            property="og:description"
            content={pageData?.meta_description}
            key="ogdesc"
          />
        </Head>
        <section className="header" style={{ position: "relative" }}>
          <img
            layout="fill"
            src={`${process.env.CMS_URL}/assets/${pageData?.header_image.id}?format=webp`}
            alt={pageData.header_image.description}
          />
        </section>
        <PrimarySection title="Our History" description={pageData?.main_text} />
        <div
          style={{
            scrollMarginTop: "0",
            paddingTop: "10em",
            background: "white",
          }}
          id="articles"
        >
          <ArticleCollection articles={articles} />
        </div>
      </main>
    </>
  );
};

export default index;
