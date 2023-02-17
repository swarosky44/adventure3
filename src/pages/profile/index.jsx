import React ,{ useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less';
import { isMobile } from 'react-device-detect';
import { PlusOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import { Button, Modal, Input,Form } from 'antd';


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  console.log("address", address);

  // const openNameModel = ()=>{}

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <main className={styles.main}>
        <div className={styles.userInfo}>
          <div className={styles.title}>Account</div>
          <img className={styles.avatar} src="https://db35z3hw6fbxp.cloudfront.net/detail-logo.png" />
          {address && <div className={styles.walletAddress}>{address}</div>}
          <Button icon={<UserOutlined />}>Pleae Enter your name<EditOutlined onClick={showModal} /></Button>
        </div>
      </main>
      <Modal title="Please enter your name" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          ref={formRef}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}

export default Profile;
