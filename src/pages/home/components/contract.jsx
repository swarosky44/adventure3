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
        <h2 className={styles.brandsTitle}>Trusted by brands & communities</h2>
        <img className={styles.brands} src="https://db35z3hw6fbxp.cloudfront.net/Group+850.png" />
      </motion.div>
      <div className={styles.panel}>
        <div className={styles.title}>
          <p>Start</p>
          <p>your AD3</p>
          <p>Journey</p>
        </div>
        <div className={styles.content}>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+847.png" />
            Explore{' '}
            <a target="_blank" href="https://ad3s-organization.gitbook.io/ad3-whitepaper/">
              Whitepaper
            </a>{' '}
          </p>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+796-1.png" />
            Join our{' '}
            <a target="_blank" href="https://twitter.com/ad3_protocol">
              community
            </a>
          </p>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+797.png" />
            Contact us to{' '}
            <a target="_blank" href="https://t.me/+oD5ACHb-e7tiMDdl">
              become a Partner
            </a>
          </p>
        </div>
        <motion.div
          className={styles.iconBox}
          style={{ transformOrigin: 'center center' }}
          initial={{ y: 20, rotate: -120 }}
          whileInView={{ y: 0, rotate: 0 }}
          transition={{ type: 'easeOut', delay: 1, duration: 0.5 }}
        >
          <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767-1.png" />
        </motion.div>

        <motion.div
          className={styles.book}
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ type: 'easeOut', delay: 1, duration: 0.5 }}
        >
          <a
            style={{ color: '#333', textDecoration: 'none' }}
            target="_blank"
            href="https://forms.gle/3QbvvQfnKfpWqVrJ7"
          >
            Book a Demo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
