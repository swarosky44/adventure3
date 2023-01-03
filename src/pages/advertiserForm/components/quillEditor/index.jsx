import { useState } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const QuillEditor = ({ value = '', onChange = () => {} }) => {
  const [textValue] = useState(BraftEditor.createEditorState(null))

  const changeHandler = () => {}

  return (
    <div style={{ width: '600px', border: '1px solid #ccc' }}>
      <BraftEditor value={textValue} onChange={changeHandler} />
    </div>
  )
}

export default QuillEditor
