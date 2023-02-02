import { useState, useEffect } from 'react'
import styles from './index.module.less'

export default () => {
  const [countdown, setCountdown] = useState(Date.now() + 24 * 4 * 60 * 60 * 1000 - Date.now())

  useEffect(() => {
    setInterval(() => {
      setCountdown((v) => {
        if (v >= 1000) {
          return v - 1000
        }
        return 0
      })
    }, 1000)
  }, [])

  // 渲染倒计时
  const renderCountdown = () => {
    const D = Math.floor(countdown / (24 * 60 * 60 * 1000))
    const H = Math.floor((countdown - D * 24 * 60 * 60 * 1000) / (60 * 60 * 1000))
    const m = Math.floor((countdown - D * 24 * 60 * 60 * 1000 - H * 60 * 60 * 1000) / (60 * 1000))
    const s = Math.floor(
      (countdown - D * 24 * 60 * 60 * 1000 - H * 60 * 60 * 1000 - m * 60 * 1000) / 1000
    )

    return (
      <div className={styles.countdown}>
        <div className={styles.countdownBlock}>
          <div className={styles.countdownValue}>{D >= 10 ? D : `0${D}`}</div>
          <div className={styles.countdownUnit}>Days</div>
        </div>
        <div className={styles.countdownBlock}>
          <div className={styles.countdownValue}>{H >= 10 ? H : `0${H}`}</div>
          <div className={styles.countdownUnit}>Hours</div>
        </div>
        <div className={styles.countdownBlock}>
          <div className={styles.countdownValue}>{m >= 10 ? m : `0${m}`}</div>
          <div className={styles.countdownUnit}>Minutes</div>
        </div>
        <div className={styles.countdownBlock}>
          <div className={styles.countdownValue}>{s >= 10 ? s : `0${s}`}</div>
          <div className={styles.countdownUnit}>Seconds</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.module}>
      <div className={styles.title}>
        <div className={styles.titleText}>Reward</div>
        <div className={styles.tags}>
          <div className={styles.tag} style={{ marginRight: '10px' }}>
            <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/gift-icon.png" />
            Lucky Draw
          </div>
          <div className={styles.tag}>
            <img
              className={styles.icon}
              src="https://db35z3hw6fbxp.cloudfront.net/custom-icon.png"
            />
            Bouns
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <img
            className={styles.cardTitleIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/bouns-icon.png"
          />
          <div className={styles.cardTitleText}>Bouns</div>
          <img
            className={styles.chainIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/ethereum.png"
          />
        </div>
        <div className={styles.cardLine}>
          <div className={styles.lineLable}>Total Budget</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/coin-icon.png"
          />
          <div className={styles.lineValue}>1000</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLine}>
          <div className={styles.lineLable}>CPA Commission</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/coin-icon.png"
          />
          <div className={styles.lineValue}>1000</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLine}>
          <div className={styles.lineLable}>Commission Limit</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/coin-icon.png"
          />
          <div className={styles.lineValue}>1000</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLineProcess}>
          <div className={styles.lineLable}>Remaining Budget</div>
          <div className={styles.process}>
            <div className={styles.processLine} style={{ width: '50%' }} />
            <div className={styles.processText}>600 / 1000 USDT</div>
          </div>
        </div>
        <div className={styles.cardLine} style={{ border: 'none' }}>
          <div className={styles.lineLable}>CPA Point</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/p-coin-icon.png"
          />
          <div className={styles.lineValue}>80</div>
          <div className={styles.lineUnit}>Points</div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <img
            className={styles.cardTitleIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/gift-icon.png"
          />
          <div className={styles.cardTitleText}>Lucky Draw</div>
          <img
            className={styles.chainIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/ethereum.png"
          />
        </div>
        <div className={styles.cardLineCountdown}>{renderCountdown()}</div>
        <div className={styles.cardLine}>
          <div className={styles.lineLable}>Token</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/coin-icon.png"
          />
          <div className={styles.lineValue}>1000</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLine} style={{ border: 'none' }}>
          <div className={styles.lineLable}>Total Point</div>
          <img
            className={styles.lineIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/p-coin-icon.png"
          />
          <div className={styles.lineValue}>2000</div>
          <div className={styles.lineUnit}>Points</div>
        </div>
      </div>
    </div>
  )
}
