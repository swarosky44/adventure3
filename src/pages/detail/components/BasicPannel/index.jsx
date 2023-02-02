import { message } from 'antd'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useAccount } from 'wagmi'
import Task from '../taskItem'
import styles from './index.module.less'

export default () => {
  const [operaVisible, setOperaVisible] = useState(false)
  const { address } = useAccount()

  return (
    <div className={styles.module}>
      <div className={styles.company}>
        <img
          className={styles.companyLogo}
          src="https://db35z3hw6fbxp.cloudfront.net/company-logo.png"
        />
        <span className={styles.companyName}>Brand Name Brand Name</span>
        <img
          className={styles.companyVerifyIcon}
          src="https://db35z3hw6fbxp.cloudfront.net/company-verify-icon.png"
        />
      </div>
      <div className={styles.title}>EventName EventName EventName EventName EventName EventNam</div>
      <div className={styles.tags}>
        <div className={styles.tag}>2022.02.02 10:00 ~ 2022.03.03 21:59:59 (UTC+8)</div>
        <div className={styles.tag}>ongoing</div>
      </div>
      <div className={styles.list}>
        {['Twitter', 'Discord', 'Telegram', 'Custom', 'TwitterTween'].map((item, index) => (
          <Task key={`task-${index}`} item={item} index={index} />
        ))}
        <div className={styles.task}>
          <div className={styles.taskContent} onClick={() => setOperaVisible((v) => !v)}>
            <img
              className={styles.taskIcon}
              src="https://db35z3hw6fbxp.cloudfront.net/custom-icon.png"
            />
            <span className={styles.taskText}>Publish content to bring in users</span>
          </div>
          {operaVisible ? (
            <div className={styles.taskOperaPannel}>
              <div className={styles.taskBtns}>
                <CopyToClipboard
                  text={`${location.herf}&address=${address}`}
                  onCopy={() =>
                    message.success('Create success! Publish Content to birng in users')
                  }
                >
                  <div className={styles.doBtn}>CREATE URL</div>
                </CopyToClipboard>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
