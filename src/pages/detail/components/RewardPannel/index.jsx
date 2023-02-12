import { useState, useEffect, useMemo } from 'react'
import styles from './index.module.less'

const getInitCountdown = (drawTime = 0) => {
  if (drawTime <= 0 || Number.isNaN(drawTime)) {
    return 0
  }
  return drawTime - Date.now()
}
export default ({ data = {}, cpa = {}, action = {} }) => {
  const [countdown, setCountdown] = useState(
    getInitCountdown(new Date(data.actionTaskDrawTime).getTime())
  )

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

  // 渲染 TOKEN ICON
  const renderTokenIcon = (tokenType = '') => {
    if (tokenType === 'usdt') {
      return 'https://db35z3hw6fbxp.cloudfront.net/usdt-icon.png'
    } else if (tokenType === 'usdc') {
      return 'https://db35z3hw6fbxp.cloudfront.net/coin-icon.png'
    }
    return 'https://db35z3hw6fbxp.cloudfront.net/tokens.png'
  }

  // 渲染用户列表
  const userList = useMemo(() => {
    const listEl = []
    const total = action.finishCnt <= 10 ? action.finishCnt + 10 : action.finishCnt
    for (let i = 0; i <= total; i += 1) {
      const index = Math.floor(Math.random() * (100 - 1)) + 1
      listEl.push(
        <img
          className={styles.userIcon}
          key={i}
          src={`https://db35z3hw6fbxp.cloudfront.net/user-icon${index}.png`}
        />
      )
    }
    return listEl
  }, [action.finishCnt])

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
          <img className={styles.lineIcon} src={renderTokenIcon(data.cpaTaskRewardUnit)} />
          <div className={styles.lineValue}>{data.cpaTaskRewardBudget}</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLine}>
          <div className={styles.lineLable}>CPA Commission</div>
          <img className={styles.lineIcon} src={renderTokenIcon(data.cpaTaskRewardUnit)} />
          <div className={styles.lineValue}>{data.cpaTaskPerPrice}</div>
          <div className={styles.lineUnit}>USDT</div>
        </div>
        <div className={styles.cardLineProcess}>
          <div className={styles.lineLable}>Remaining Budget</div>
          <div className={styles.process}>
            <div
              className={styles.processLine}
              style={{ width: (cpa.finishCnt * data.cpaTaskPerPrice) / data.cpaTaskRewardBudget }}
            />
            <div className={styles.processText}>
              {cpa.finishCnt * data.cpaTaskPerPrice} / {data.cpaTaskRewardBudget} USDT
            </div>
          </div>
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
          <div className={styles.lineLable}>Token Budget</div>
          <img className={styles.lineIcon} src="https://db35z3hw6fbxp.cloudfront.net/tokens.png" />
          <div className={styles.lineValue}>{data.actionTaskRewardNum}</div>
          <div className={styles.lineUnit}>{data.actionTaskRewardUnit}</div>
        </div>
        <div className={styles.cardLine} style={{ border: 'none' }}>
          <div className={styles.lineLable}>Total Point</div>
          <img className={styles.lineIcon} src="https://db35z3hw6fbxp.cloudfront.net/tokens.png" />
          <div className={styles.lineValue}>{data.actionTaskRewardBudget}</div>
          <div className={styles.lineUnit}>{data.actionTaskRewardUnit}</div>
        </div>
      </div>
      <div className={styles.adventure}>
        <div className={styles.titleText}>Adventure</div>
        <div className={styles.userList}>{userList}</div>
      </div>
    </div>
  )
}
