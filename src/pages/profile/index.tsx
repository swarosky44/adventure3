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
import { ONE, TWO, THREE, TaskFeeStatusVal } from './const.ts';
import { request } from '../../utils/request';


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const [inputValue, SetInputValue] = useState('');
  const [api, contextHolder] = notification.useNotification();
  // table
  const [activeKey, setActiveKey] = useState(ONE);
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
      dataIndex: 'projectTaskDTO.title',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">{record.projectTaskDTO.title}</Space>
      ),
    },
    {
      title: 'Token',
      colSpan: 2,
      children: [
        {
          title: 'cpa token',
          dataIndex: 'cpaTaskRewardUnit',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.cpaTaskRewardUnit}</Space>
          ),
        },
        {
          title: 'task token',
          dataIndex: 'actionTaskRewardUnit',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.actionTaskRewardUnit}</Space>
          ),
        },
      ]
    },
    {
      title: 'Amount',
      colSpan: 2,
      children: [
        {
          title: 'cpa amount',
          dataIndex: 'cpaTaskFeeAmount ',
          render: (_, record) => (
            <Space size="middle">{record.cpaTaskFeeAmount}</Space>
          ),
        },
        {
          title: 'task amount',
          dataIndex: 'actionTaskFeeAmount',
          render: (_, record) => (
            <Space size="middle">{record.actionTaskFeeAmount}</Space>
          ),
        },
      ]
    },
    {
      title: '已提现',
      colSpan: 2,
      children: [
        {
          title: 'cpa amount',
          dataIndex: 'cpaTaskRewardBudget',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.cpaTaskRewardBudget}</Space>
          ),
        },
        {
          title: 'task amount',
          dataIndex: 'actionTaskRewardBudget',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.actionTaskRewardBudget}</Space>
          ),
        },
      ]
    },
    {
      title: '可提取',
      colSpan: 2,
      children: [
        {
          title: 'cpa',
          dataIndex: 'cpaTaskFeeStatus',
          render: (_, record) => (
            <Space size="middle">{TaskFeeStatusVal[record.cpaTaskFeeStatus]}</Space>
          ),
        },
        {
          title: 'task',
          dataIndex: 'actionTaskFeeStatus',
          render: (_, record) => (
            <Space size="middle">{TaskFeeStatusVal[record.actionTaskFeeStatus]}</Space>
          ),
        },
      ]
    },
    {
      title: '截止有效期',
      dataIndex: 'launchEndTime',
      render: (_, record) => (
        <Space size="middle">{record.projectTaskDTO.launchEndTime}</Space>
      ),
    },
    {
      title: '操作',
      colSpan: 2,
      children: [
        {
          title: 'cpa action',
          render: (_, record) => (
            <Space size="middle"><a>分享任务提现</a></Space>
          ),
        },
        {
          title: 'task amount',
          render: (_, record) => (
            <Space size="middle"><a>行为任务提现</a></Space>
          ),
        },
      ]
    },
  ];


  const fetchData = async () => {
    setLoading(true);
    const ret = await request({
      api: 'api/taskInstance/queryProjectTaskResult',
      params: {
        address,
        projectTaskId: 41,
        pageSize: tableParams.pagination.pageSize,
        pageNum: tableParams.pagination.current
      }
    })
    if (ret.code === 0 && ret.result) {
      setData(ret.result.list);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: ret.result.total,
        },
      });
    }
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
          {/* <div className={styles.categoryWrapper}>
            <div onClick={() => categoryClick(ONE)} className={activeKey === ONE ? categoryClassArr.join(' ') : styles.category}>ALL</div>
            <div onClick={() => categoryClick(TWO)} className={activeKey === TWO ? categoryClassArr.join(' ') : styles.category}>积分任务</div>
            <div onClick={() => categoryClick(THREE)} className={activeKey === THREE ? categoryClassArr.join(' ') : styles.category}>分享任务</div>
          </div> */}
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            bordered={true}
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
