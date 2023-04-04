import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useWindowScroll from '@react-hook/window-scroll'
import styles from '../index.module.less'

export default () => {
  const [currentIndex, setCurrentIndex] = useState(1)

  const refScroll = useRef(null)
  const refStickyBox = useRef(null)
  const scrollY = useWindowScroll(45)

  const top = refScroll.current ? refScroll.current.offsetTop : 0
  const height = refStickyBox.current ? refStickyBox.current.offsetHeight : 0
  const distance = scrollY - top
  const step1 = height * 0.33
  const step2 = height * 0.66
  const step3 = height

  useEffect(() => {
    if (distance > 0) {
      if (distance <= step1 && currentIndex !== 1) {
        setCurrentIndex(1)
      } else if (distance > step1 && distance <= step2 && currentIndex !== 2) {
        setCurrentIndex(2)
      } else if (distance > step2 && distance <= step3 && currentIndex !== 3) {
        setCurrentIndex(3)
      }
    }
  }, [distance, currentIndex])

  return (
    <div className={styles.scrollCarousel} ref={refScroll}>
      <div className={styles.stickyBox} ref={refStickyBox}>
        <h1 className={styles.title}>
          <motion.div
            animate={{ rotate: `${currentIndex * 180}deg` }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transformOrigin: 'center center'
            }}
            transition={{ type: 'easeOut', duration: 0.5 }}
          >
            <img
              className={styles.titleIcon}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+766.png"
            />
          </motion.div>
          <span style={{ paddingLeft: '2.4vw' }}>How to use our product</span>
        </h1>
        <div className={styles.nav}>
          <a className={styles.navItem} onClick={() => setCurrentIndex(1)}>
            Create a Task
          </a>
          <a className={styles.navItem} onClick={() => setCurrentIndex(2)}>
            Distribute a Task
          </a>
          <a className={styles.navItem} onClick={() => setCurrentIndex(3)}>
            Track growth
          </a>
        </div>
        <div className={styles.navLineBox}>
          <motion.div
            className={styles.navLine}
            animate={{ x: `${(currentIndex / 3 - 1) * 100}%` }}
            transition={{ type: 'linear', duration: 0.5 }}
          />
        </div>
        <div className={styles.transformBox}>
          <motion.div
            className={styles.panel}
            style={{ zIndex: currentIndex === 1 ? 3 : 1 }}
            animate={{ opacity: currentIndex === 1 ? 1 : 0 }}
            transition={{ type: 'linear', duration: 0.5 }}
          >
            <div className={styles.info}>
              <p className={styles.title}>Specialize in developing</p>
              <p className={styles.title}>marketing tasks</p>
              <p className={styles.sub}>Create a marketing campaign with different task</p>
              <p className={styles.sub}>templates quickly base on your marketing goals.</p>
            </div>
            <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+770.png" />
          </motion.div>
          <motion.div
            className={styles.panel}
            style={{ zIndex: currentIndex === 2 ? 3 : 2 }}
            animate={{ opacity: currentIndex === 2 ? 1 : 0 }}
            transition={{ type: 'linear', duration: 0.5 }}
          >
            <div className={styles.info}>
              <p className={styles.title}>Social Media Networking</p>
              <p className={styles.sub}>Unleash the true power of social media networking</p>
              <p className={styles.sub}>by sharing tasks on your own social media profiles</p>
              <p className={styles.sub}>and earning greater rewards.</p>
            </div>
            <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+781.png" />
          </motion.div>
          <motion.div
            className={styles.panel}
            style={{ zIndex: currentIndex === 3 ? 3 : 1 }}
            animate={{ opacity: currentIndex === 3 ? 1 : 0 }}
            transition={{ type: 'linear', duration: 0.5 }}
          >
            <div className={styles.info}>
              <p className={styles.title}>Seamless tracking Services </p>
              <p className={styles.sub}>Monitor task performance through data analysis </p>
              <p className={styles.sub}>center.</p>
            </div>
            <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+762.png" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
