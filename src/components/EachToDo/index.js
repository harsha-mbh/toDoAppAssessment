import {AiFillDelete} from 'react-icons/ai'
import './index.css'

const EachToDo = props => {
  const {eachTodo, onChangeTodoStatus, onDeleteTodo} = props
  const {id, task, isChecked} = eachTodo
  const completeClass = isChecked ? 'completed' : null
  const onClickTodo = () => {
    onChangeTodoStatus(id)
  }

  const onClickDelete = () => {
    onDeleteTodo(id)
  }

  return (
    <li className={`to-do-element ${completeClass}`}>
      <input
        type="checkbox"
        className="checkbox"
        onChange={onClickTodo}
        checked={isChecked}
      />
      <label className="task">{task}</label>
      <AiFillDelete className="delete-icon" onClick={onClickDelete} />
    </li>
  )
}

export default EachToDo
