import styles from '../index.module.less'

export default () => {
  return (
    <section className={styles.desc}>
      <img className={styles.yun} src="https://db35z3hw6fbxp.cloudfront.net/Vector.png" />
      <p className={styles.process}>
        <span>Create</span>
        <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
        <span>Distribution</span>
        <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
        <span>Analysis</span>
      </p>
      <p>AD3 make it simple to grow your brand in Web3.</p>
    </section>
  )
}
