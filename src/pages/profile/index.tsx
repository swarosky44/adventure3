import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less';
import { isMobile } from 'react-device-detect';
import { PlusOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import { Button, Modal, Input, Form, notification, Space, Table, Tag } from 'antd';
import { DataType, TableParams } from './interface.ts';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import {ONE,TWO,THREE} from './const.ts';


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const [inputValue, SetInputValue] = useState('');
  const [api, contextHolder] = notification.useNotification();
  // table
  const [activeKey,setActiveKey] = useState(ONE);
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      render: (name) => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Token',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Amount',
      dataIndex: 'email',
    },
    {
      title: '已提现',
      dataIndex: 'email',
    },
    {
      title: '可提取',
      dataIndex: 'email',
    },
    {
      title: '截止有效期',
      dataIndex: 'registered.date',
    },
    {
      title: '操作',
      dataIndex: 'email',
      render: (_, record) => (
        <Space size="middle">
          <a>提现</a>
        </Space>
      ),
    },
  ];

  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        console.log("results", results);
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const categoryClassArr = [`${styles.category}`, `${styles.active}`];

  const categoryClick = (key: number) => {
    setActiveKey(key);
  }

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
          {contextHolder}
          <Button className={`${styles.btn} ${styles.userNameBtn}`} icon={<UserOutlined />} onClick={showModal}>{inputValue ? inputValue : 'Pleae Enter your name'}<EditOutlined /></Button>
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.categoryTitle}>任务收益明细</div>
          <div className={styles.categoryWrapper}>
            <div onClick={()=>categoryClick(ONE)} className={activeKey ===ONE ? categoryClassArr.join(' ') : styles.category}>ALL</div>
            <div onClick={()=>categoryClick(TWO)} className={activeKey ===TWO ? categoryClassArr.join(' ') : styles.category}>积分任务</div>
            <div onClick={()=>categoryClick(THREE)} className={activeKey ===THREE ? categoryClassArr.join(' ') : styles.category}>分享任务</div>
          </div>
          <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
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
