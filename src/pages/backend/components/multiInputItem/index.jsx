import { Space, Select, Input } from 'antd'

const MultiInputItem = () => {
  return (
    <Space.Compact>
      <Select style={{ width: 140 }}>
        <Select.Option key="eth" value="eth">
          Ethereum
        </Select.Option>
      </Select>
      <Input style={{ width: 220 }} />
    </Space.Compact>
  )
}

export default MultiInputItem
