import Image from "next/image";
import styles from "../../styles/Article.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/Articles?fields=slug&filter[status]=published`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  // if article.is_link is true, then the article is a link to an external site
  // and should not be rendered as a page
  const paths = data.data
    .filter((article) => article.is_link === false)
    .map((article) => ({
      params: { slug: article.slug },
    }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const [article, recentArticles] = await Promise.all([
    getArticle(params.slug),
    getRecentArticles(params.slug),
  ]);

  return {
    props: {
      article,
      recentArticles,
    },
    revalidate: 1,
  };
}

async function getArticle(slug) {
  const res = await fetch(
    `${process.env.CMS_URL}/items/Articles?fields=*.*.*&filter[slug]=${slug}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data[0];
}

async function getRecentArticles(slug) {
  // gets last 3 articles by date created
  const res = await fetch(
    `${process.env.CMS_URL}/items/Articles?fields=*.*.*&filter[status]=published&sort=-date_created&limit=3&filter[slug][_neq]=${slug}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data;
}

const articleShow = ({ article, recentArticles }) => {
  const router = useRouter();

  let truncatedContent = "...";
  if (
    typeof article?.article_content !== undefined &&
    article?.article_content !== null
  ) {
    truncatedContent =
      article?.article_content.replace(/(<([^>]+)>)/gi, "").substring(0, 145) +
      "...";
  }

  return (
    <>
      <Head>
        <title>{article.title} | Articles | Portsmouth Housing Authority</title>
        <meta name="description" content={truncatedContent} />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={process.env.SITE_URL + router.asPath}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={
            article?.featured_image
              ? process.env.CMS_URL + "/assets/" + article?.featured_image.id
              : process.env.SITE_URL + "/img/news-placeholder.png"
          }
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={"Portsmouth Housing Authority"}
          key="ogsitename"
        />
        <meta property="og:title" content={article.title} key="ogtitle" />
        <meta
          property="og:description"
          content={truncatedContent}
          key="ogdesc"
        />
      </Head>
      <section className={styles.articleHeader}>
        <div className={`${styles.articlePageContainer} container`}>
          <article>
            {article?.featured_image && article?.featured_image.id !== null ? (
              <div
                className={`${styles.articlePageImageContainer} articleImageContainer`}
              >
                <Image
                  src={`${process.env.CMS_URL}/assets/${article?.featured_image.id}?format=webp`}
                  alt={article.featured_image.description}
                  fill
                  objectFit="cover"
                />
              </div>
            ) : null}
            <div className={styles.articlePageContent}>
              <h1 className={styles.articlePageTitle}>{article?.title}</h1>
              <div className={`${styles.articlePageDate} badge badge-grey`}>
                {
                  // conver date_created into a readable format
                  new Date(article?.date_created).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }
              </div>
              <div
                className={styles.articlePageDescription}
                dangerouslySetInnerHTML={{ __html: article?.article_content }}
              ></div>
            </div>
          </article>
          {recentArticles.length > 0 ? (
            <aside className={styles.articleAside}>
              <h2 style={{ marginBottom: "0.5em" }}>Recent Articles</h2>
              <ul
                style={{ display: "flex", flexDirection: "column", gap: "1em" }}
              >
                {recentArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={
                        article.is_link
                          ? article.link
                          : `/articles/${article.slug}`
                      }
                      target={article.is_link ? "_blank" : ""}
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                style={{ display: "block", marginTop: "2rem" }}
                href="/about#articles"
              >
                <FontAwesomeIcon
                  style={{
                    color: "var(--primary)",
                  }}
                  icon={faArrowLeft}
                />{" "}
                See All News
              </Link>
            </aside>
          ) : null}
          <Link
            className="newsBackBtn"
            href="/about#articles"
            style={{
              color: "var(--primary)",
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              padding: "0.75rem 1rem",
              width: "fit-content",
              background: "#fff",
              borderRadius: "5px",
              borderColor: "var(--primary)",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <FontAwesomeIcon
              style={{
                color: "var(--primary)",
              }}
              icon={faArrowLeft}
            />
            <span>Back to All News</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default articleShow;
