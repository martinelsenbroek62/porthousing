import styles from '../styles/ContactBlock.module.css'
import { Widget } from '@typeform/embed-react'

const TypeForm = () => {
  return <Widget id="Izmt6Aoq" style={{ width: '100%', height:'400px' }} className="my-form" />
}

const ContactBlock = () => {
  return (
    <>
    <section className={styles.contactBlockSection}>
      <div className="container">
        <div className={styles.contactBlockInfo}>
          <h1 className={styles.contactBlockTitle}>Here When you Need Us</h1>
          <p className={styles.contactBlockText}>Have a question? We’d love to help! Fill out the form below and we’ll get back to you as soon as humanly possible.</p>
        </div>
        <div className={styles.contactBlockTypeform}>
          <TypeForm />
        </div>
        <img style={{width:'10vw', height:'10vw', position:'absolute', left:'-5vw', top:'5em', zIndex:0}} src={"/svg/accent-circle.svg"} alt="" />
        <img style={{width:'15vw', height:'15vw', position:'absolute', right:'-5vw', bottom:'calc(50% - 15vw / 2)', zIndex:0}} src={"/svg/accent-circle.svg"} alt="" />
      </div>
    </section>
    </>
  )
}

export default ContactBlock