import {useState} from 'react'
import styles from '../styles/FAQs.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FAQBlock = ({question, answer}) => {

  const [answerShown, setAnswerShown] = useState(false);

  const toggleAnswer = () => {
    setAnswerShown(!answerShown);
  }

  return (
    <div className={styles.faqContainer}>
      <button className={styles.faqQuestion}
      onClick={() => {toggleAnswer()}}
      >
        <FontAwesomeIcon className={`${styles.questionIcon} ${answerShown ? styles.questionIconRotated : null}`} icon={faPlus}/>
        <h2>{question}</h2>
      </button>
      <div className={`${styles.faqAnswer} ${answerShown ? styles.answerShown : styles.answerHidden}`}>
        <div dangerouslySetInnerHTML={{__html: answer}} className={styles.faqDescription}></div>
      </div>
    </div>
  )
}

export default FAQBlock