import Head from "next/head";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/reports_and_projects_page?fields=*.*.*`,
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
  const [pageData] = await Promise.all([getPageData()]);
  return {
    props: {
      pageData,
    },
    revalidate: 1,
  };
}

const index = ({ pageData }) => {
  return (
    <>
      <Head>
        <title>Reports & Projects | Portsmouth Housing Authority</title>
        <meta name="description" content={"PHA reports and projects."} />
      </Head>
      <main>
        <section className="main-info">
          <div className="container">
            <h1 className="primaryTitle">Reports</h1>
            <br />
            {pageData?.reports ? (
              <div
                className="reports-container"
                dangerouslySetInnerHTML={{ __html: pageData.reports }}
              />
            ) : null}
            <br />
            <br />
          </div>
          <div className="container">
            <h1 className="primaryTitle">Projects</h1>
            <br />
            {pageData?.projects ? (
              <div
                className="projects-container"
                dangerouslySetInnerHTML={{ __html: pageData.projects }}
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
