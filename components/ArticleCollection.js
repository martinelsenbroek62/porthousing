import styles from '../styles/ArticleCollection.module.css'
import Article from './Article'

const ArticleCollection = ({articles}) => {
  return (
    <section className={`${styles.articleCollection} ${styles.articleAnchor}`}>
      <div className="container">
      <h1 className="primaryTitle">News</h1>
        <div className={styles.articleContainer}>
          {articles.map((article) => (
            <Article key={article.id} article={article} suppressHydrationWarning />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticleCollection