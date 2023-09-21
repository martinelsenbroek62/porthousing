import Head from "next/head";
import Image from "next/image";
import PrimarySection from "../../components/PrimarySection";
import FAQs from "../../components/FAQs";
import {
  faBuilding,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=for-landlords&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

async function getAdditionalPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/for_landlords_page?fields=*.*.*`,
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
  const [pageData, additionalPageData] = await Promise.all([
    getPageData(),
    getAdditionalPageData(),
  ]);
  return {
    props: {
      pageData,
      additionalPageData,
    },
    revalidate: 1,
  };
}

const index = ({ pageData, additionalPageData }) => {
  return (
    <>
      <Head>
        <title>For Landlords | Portsmouth Housing Authority</title>
        <meta name="description" content={"PHA resources for landlords."} />
      </Head>
      <main>
        <section className="header">
          <img
            src={`${process.env.CMS_URL}/assets/${pageData?.header_image.id}?format=webp`}
            alt={pageData.header_image.description}
          />
        </section>
        <PrimarySection
          relatedLinks={[
            { title: "Landlord FAQs", link: "#faqs", icon: faQuestionCircle },
            {
              title: "Our Properties",
              link: "/housing/properties",
              icon: faBuilding,
            },
          ]}
          title="For Landlords"
          description={pageData?.main_text}
        />
        <FAQs title="Landlords FAQs" faqData={pageData?.faqs} />
        <section className="main-info">
          <div className="container">
            <br />
            {additionalPageData?.page_content ? (
              <div
                className="reports-container"
                dangerouslySetInnerHTML={{
                  __html: additionalPageData?.page_content,
                }}
              />
            ) : null}
            <br />
            <br />
          </div>
        </section>
      </main>
    </>
  );
};

export default index;
