import { ConnectButton } from '@rainbow-me/rainbowkit';
import {  useNavigate } from 'react-router-dom'
import styles from './index.module.less';
import { isMobile } from 'react-device-detect';
import { PlusOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';


const Profile = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  console.log("address", address);

  return (
    <div className={styles.page}>
        <header className={styles.header}>
        <img className={styles.logo} src="https://db35z3hw6fbxp.cloudfront.net/detail-logo.png" />
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
    </div>
  )
}

export default Profile;
