import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const QuillEditor = ({ value = '', onChange = () => {} }) => {
  return (
    <div style={{ width: '600px', border: '1px solid #ccc' }}>
      <BraftEditor value={value} onChange={onChange} />
    </div>
  )
}

export default QuillEditor
