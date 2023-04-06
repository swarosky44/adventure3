import { Outlet, useNavigate } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { isMobile } from 'react-device-detect'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const BasicLayout = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img
          className={styles.logo}
          src="https://db35z3hw6fbxp.cloudfront.net/Group+789.png"
          onClick={() => navigate('/')}
        />
        <div className={styles.right}>
          <ConnectButton />
          {!isMobile ? (
            <div className={styles.create} onClick={() => navigate('/backend/create')}>
              <PlusOutlined style={{ marginRight: '8px' }} />
              New Adventure
            </div>
          ) : null}
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default BasicLayout
