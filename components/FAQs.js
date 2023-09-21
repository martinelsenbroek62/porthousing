import styles from "../styles/FAQs.module.css";
import FAQBlock from "./FAQBlock";

const FAQs = ({ faqData, title }) => {
  return (
    <section
      style={{ scrollMarginTop: "100px" }}
      id={"faqs"}
      className={styles.faq}
    >
      <div className="container">
        <h1 className="primaryTitle">{title}</h1>
        <div className={styles.allFaqs}>
          {faqData.map((faq, index) => {
            return (
              <FAQBlock
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
