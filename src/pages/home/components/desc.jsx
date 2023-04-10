import styles from '../index.module.less'

export default () => {
  return (
    <section className={styles.desc}>
      <img className={styles.yun} src="https://db35z3hw6fbxp.cloudfront.net/Vector.png" />
      <p className={styles.process}>
        <span>Assign Tasks</span>
        <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
        <span>Distribute Tasks</span>
        <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
        <span>Track growth</span>
      </p>
      <p style={{ opacity: 0.7, fontSize: '1.6vw' }}>
        AD3 make it simple to grow your brand in Web3.
      </p>
    </section>
  )
}
