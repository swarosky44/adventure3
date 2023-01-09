import { Space, Select } from 'antd'

const MultiSelect = () => {
  return (
    <Space.Compact>
      <Select style={{ width: 140 }}>
        <Select.Option key="eth" value="eth">
          Ethereum
        </Select.Option>
      </Select>
      <Select style={{ width: 220 }}>
        <Select.Option key="usdt" value="usdt">
          USDT
        </Select.Option>
        <Select.Option key="usdc" value="usdc">
          USDC
        </Select.Option>
      </Select>
    </Space.Compact>
  )
}

export default MultiSelect
