export const ONE = 1
export const TWO = 2
export const THREE = 3

export const TaskFeeStatusVal = {
  'pending': '未提取',
  'finish': '已提取'
}

// 本地环境 （合约部署 localhost:8545）的测试数据
export const MOCK = [
  {
    id: 1,
    projectTaskDTO: {
      title: '测试任务1',
      campaignAddress: '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be',
      cpaTaskRewardUnit: 'usdt',
      actionTaskRewardUnit: 'usdt',
      cpaTaskRewardBudget: 100,
      actionTaskRewardBudget: 100,
      launchEndTime: '2023/02/27 00:00:00',
      cpaTaskFeeKeyR: '0x9ff1682f248db2f569d5e941f267a4eb78643209b963d67d56708afd01e94a72',
      cpaTaskFeeKeyS: '0x041bef04be0834f1bc93a8d82a327cf48723a81a15f7f7571d48dcdd8113dacb',
      cpaTaskFeeKeyV: '28',
      actionTaskFeeKeyR: '0x9ff1682f248db2f569d5e941f267a4eb78643209b963d67d56708afd01e94a72',
      actionTaskFeeKeyS: '0x041bef04be0834f1bc93a8d82a327cf48723a81a15f7f7571d48dcdd8113dacb',
      actionTaskFeeKeyV: '28'
    },
    cpaTaskFeeAmount: 10,
    actionTaskFeeAmount: 10,
    cpaTaskFeeStatus: 'pending',
    actionTaskFeeStatus: 'pending'
  }
]
