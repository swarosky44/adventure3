import { motion } from 'framer-motion'
import styles from '../index.module.less'

export default () => {
  return (
    <section className={styles.contract}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: 'easeOut', duration: 0.5 }}
      >
        <img className={styles.brands} src="https://db35z3hw6fbxp.cloudfront.net/Group+796.png" />
      </motion.div>
      <div className={styles.panel}>
        <div className={styles.title}>
          <p>Ready to</p>
          <p>get it</p>
          <p>started?</p>
        </div>
        <div className={styles.content}>
          <p>
            Explore <a>Whitepaper</a> or
          </p>
          <p>
            {' '}
            join our <a>community</a>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+796-1.png" />
          </p>
          <p>
            You can also contact us to <a>become our Partner</a>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+797.png" />
          </p>
        </div>
        <motion.div
          className={styles.iconBox}
          style={{ transformOrigin: 'center center' }}
          initial={{ y: 20, rotate: -120 }}
          whileInView={{ y: 0, rotate: 0 }}
          transition={{ type: 'easeOut', delay: 1, duration: 0.5 }}
        >
          <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767.png" />
        </motion.div>

        <motion.div
          className={styles.book}
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ type: 'easeOut', delay: 1, duration: 0.5 }}
        >
          Book a Demo
        </motion.div>
      </div>
    </section>
  )
}
