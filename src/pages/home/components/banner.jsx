import { motion } from 'framer-motion'
import styles from '../index.module.less'

export default () => {
  return (
    <section className={styles.banner}>
      <motion.div
        className={styles.banners}
        initial={{ y: 0 }}
        whileInView={{ y: '-50%' }}
        transition={{ type: 'easeOut', duration: 1, delay: 0.5 }}
      >
        <img
          className={styles.bannerImage}
          src="https://db35z3hw6fbxp.cloudfront.net/Group+811.png"
        />
        <img
          className={styles.bannerImage}
          src="https://db35z3hw6fbxp.cloudfront.net/Group+811-2.png"
        />
      </motion.div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: 'easeOut', duration: 1, delay: 0.5 }}
      >
        <h2>Degen Paradise</h2>
        <p>World&apos;s First Community-Driven Marketing Protocol</p>
        <p>Increase FOMO and Engagement within Your Community</p>
      </motion.div>
    </section>
  )
}
