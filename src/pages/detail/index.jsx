import { useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { PlusOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import particlesOpt from './particles.json'
import BasicPannel from './components/BasicPannel'
import DescPannel from './components/DescPannel'
import RewardPannel from './components/RewardPannel'
import styles from './index.module.less'

const Detail = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get('id')
  console.info(id)

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.info(container)
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img className={styles.logo} src="https://db35z3hw6fbxp.cloudfront.net/detail-logo.png" />
        <div className={styles.right}>
          <ConnectButton />
          {!isMobile ? (
            <div className={styles.create} onClick={() => navigate('/backend')}>
              <PlusOutlined style={{ marginRight: '8px' }} />
              New Adventure
            </div>
          ) : null}
        </div>
      </header>
      <main className={styles.module}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOpt}
        />
        <div className={styles.content}>
          <div className={styles.column1}>
            <BasicPannel />
            <DescPannel />
          </div>
          <div className={styles.column2}>
            <RewardPannel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Detail
