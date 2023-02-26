import React, { useState } from 'react';
import { Button, notification, Modal, Form, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.module.less';


const SocialBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = React.useRef(null);
  const [inputValue, SetInputValue] = useState('');
  const [api, contextHolder] = notification.useNotification();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Error',
      description:
        'Please enter the value to the form.',
    });
  };


  const handleOk = () => {
    const value = formRef?.current?.getFieldValue('username');
    if (value) {
      SetInputValue(value);
      setIsModalOpen(false);
    } else {
      openNotificationWithIcon('error');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Button className={`${styles.btn} ${styles.userNameBtn}`} icon={<UserOutlined />} onClick={showModal}>{inputValue ? inputValue : 'Pleae Enter your name'}<EditOutlined /></Button>
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

export default SocialBox;
