import { Outlet } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from './index.module.less'

const BasicLayout = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img className={styles.logo} src="https://db35z3hw6fbxp.cloudfront.net/ad3_logo.png" />
        <div className={styles.right}>
          <ConnectButton />
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}

export default BasicLayout
