import styles from '../index.module.less'

export default () => {
  return (
    <div className={styles.task}>
      <div className={styles.title}>
        <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767-1.png" />
        <h2 className={styles.text}>Unique Task model</h2>
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskItem}>
          <img className={styles.dog} src="https://db35z3hw6fbxp.cloudfront.net/Frame+793.png" />
          <div className={styles.content}>
            <img
              className={styles.number}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+809.png"
            />
            <div className={styles.info}>
              <h3 className={styles.taskName}>Affiliate</h3>
              <ul className={styles.tips}>
                <li className={styles.tip}>
                  Complete any task that assigned by brand&apos;s campaigns.
                </li>
                <li className={styles.tip}>
                  Invite friends to do the same using your referral link.
                </li>
                <li className={styles.tip}>
                  <span style={{ color: 'rgba(195, 255, 103, 1)' }}>
                    Earn rewards and commissions
                  </span>{' '}
                  once they complete the tasks.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskItem}>
          <img className={styles.dog} src="https://db35z3hw6fbxp.cloudfront.net/Frame+793-1.png" />
          <div className={styles.content}>
            <img
              className={styles.number}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+810.png"
            />
            <div className={styles.info}>
              <h3 className={styles.taskName}>Degen Competition</h3>
              <ul className={styles.tips}>
                <li className={styles.tip}>
                  Buy an NFT ticket to either join a team or create one.
                </li>
                <li className={styles.tip}>
                  Complete assigned tasks to compete with other teams.{' '}
                </li>
                <li className={styles.tip}>
                  Earn rewards based on your{' '}
                  <span style={{ color: 'rgba(195, 255, 103, 1)' }}>team&apos;s ranking</span> in
                  the pool.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
