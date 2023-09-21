import Flickity from "react-flickity-component";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

const flickityOptions = {
  pageDots: true,
  prevNextButtons: false,
  wrapAround: true,
  autoPlay: 3000,
  on: {
    change: function (event, pointer) {
      this.player.play();
    },
  },
};

const ArticleSlider = ({ articles }) => {
  return (
    <Flickity
      className={"carousel"} // default ''
      elementType={"div"} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static={true} // default false
    >
      {articles.map((article) => (
        <a
          href={article.is_link ? article.link : `/articles/${article.slug}`}
          target={article.is_link ? "_blank" : ""}
          key={article.id}
          className={styles.articleSliderCell}
        >
          {article?.featured_image ? (
            <Image
              layout="fill"
              placeholder="blur"
              blurDataURL={`${process.env.CMS_URL}/assets/${article.featured_image.id}?format=webp&blur=100`}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              src={`${process.env.CMS_URL}/assets/${article.featured_image.id}?format=webp`}
              alt={"PHA homepage image"}
            />
          ) : (
            <Image
              layout="fill"
              placeholder="blur"
              blurDataURL={`/img/news-placeholder.png`}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              src={`/img/news-placeholder.png`}
              alt={"PHA homepage image"}
            />
          )}
          <FontAwesomeIcon
            style={{
              color: "#fff",
              position: "absolute",
              top: "1.5em",
              right: "1.5em",
            }}
            icon={faNewspaper}
          />
          <h2 className={styles.articleSliderTitle}>
            {article?.title.replace(/(<([^>]+)>)/gi, "")}
          </h2>
        </a>
      ))}
    </Flickity>
  );
};

export default ArticleSlider;
