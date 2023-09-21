import {useState} from 'react'
import styles from '../styles/ServiceSwitcher.module.css'
import Image from 'next/image'

const ServiceSwitcher = ({services}) => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <div className={styles.serviceSwitcherContainer}>
      <div className={styles.serviceSwitcherItem}>
        <div className={styles.serviceSwitcherImageContainer}>
        <Image
          layout="fill"
          objectFit="cover"
          src={`${process.env.CMS_URL}/assets/${activeService.image.id}?format=webp`}
          alt={activeService.image.description}
          placeholder="blur"
          blurDataURL={`${process.env.CMS_URL}/assets/${activeService.image.id}?format=webp`}
        />
        </div>
        <div className={styles.serviceSwitcherContent}>
          <h3>{activeService.title}</h3>
          <div dangerouslySetInnerHTML={{__html:activeService.description}}></div>
        </div>
      </div>
      <div className={styles.serviceSwitcherBtnContainer}>
        {services.map((service, index) => {
          return (
            <button className="btn btn-accent" style={activeService.title === service.title ? {opacity:0.5} : {opacity:1}} onClick={() => {
              setActiveService(services[index])
            }} key={index}>{service.title}</button>
          )
        })}
      </div>
    </div>
  )
}

export default ServiceSwitcher