import styles from "../styles/Article.module.css";
import Link from "next/link";

const Article = ({ article }) => {
  let truncatedContent = "...";
  if (
    typeof article?.article_content !== undefined &&
    article?.article_content !== null
  ) {
    truncatedContent =
      article?.article_content.replace(/(<([^>]+)>)/gi, "").substring(0, 200) +
      "...";
  }

  return (
    <>
      <Link
        href={article.is_link ? article.link : "/articles/" + article.slug}
        target={article.is_link ? "_blank" : ""}
        className={styles.article}
      >
        <div className={styles.articleImageContainer}>
          {article?.featured_image ? (
            <img
              src={`${process.env.CMS_URL}/assets/${article.featured_image.id}?format=webp`}
              alt={article.featured_image.description}
              style={{ borderRadius: "10px" }}
            />
          ) : (
            <img
              style={{ objectFit: "cover", borderRadius: "10px" }}
              src={`/img/news-placeholder.png`}
              alt={"PHA homepage image"}
            />
          )}
        </div>
        <div className={styles.articleContent}>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          {article.is_link ? (
            <div className={styles.articleDescription}>
              <p>Click to learn more.</p>
            </div>
          ) : (
            <div
              className={styles.articleDescription}
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            ></div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Article;
