import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import EachToDo from '../EachToDo'
import './index.css'

class ToDoApp extends Component {
  state = {toDoList: [], taskInput: ''}

  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    const savedTodos = localStorage.getItem('todolist')
    console.log(savedTodos)
    if (savedTodos === null) {
      this.setState({toDoList: []})
    } else {
      this.setState({toDoList: JSON.parse(savedTodos)})
    }
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  saveTodos = () => {
    const {toDoList} = this.state
    localStorage.setItem('todolist', JSON.stringify(toDoList))
  }

  onAddTask = () => {
    const {taskInput} = this.state
    const newTask = {id: uuidv4(), task: taskInput, isChecked: false}
    this.setState(
      prevState => ({
        toDoList: [...prevState.toDoList, newTask],
        taskInput: '',
      }),
      this.saveTodos,
    )
  }

  onChangeTodoStatus = id => {
    this.setState(
      prevState => ({
        toDoList: prevState.toDoList.map(eachTodo => {
          if (id === eachTodo.id) {
            return {...eachTodo, isChecked: !eachTodo.isChecked}
          }
          return eachTodo
        }),
      }),
      this.saveTodos,
    )
  }

  onDeleteTodo = id => {
    const {toDoList} = this.state
    const filteredTodos = toDoList.filter(eachTodo => eachTodo.id !== id)
    this.setState({toDoList: filteredTodos}, this.saveTodos)
  }

  getPendingTasks = toDoList => {
    const pendingTasks = toDoList.filter(
      eachTodo => eachTodo.isChecked === false,
    )
    return pendingTasks
  }

  getCompletedTasks = toDoList => {
    const completedTasks = toDoList.filter(
      eachTodo => eachTodo.isChecked === true,
    )
    return completedTasks
  }

  render() {
    const {taskInput, toDoList} = this.state
    const pendingTasks = this.getPendingTasks(toDoList)
    const completedTasks = this.getCompletedTasks(toDoList)
    return (
      <div className="app-container">
        <h1 className="app-heading">To Do Application</h1>
        <div className="create-container">
          <h1 id="taskInput" className="field-headings">
            Create ToDo
          </h1>
          <div className="input-container">
            <input
              id="taskInput"
              className="input-field"
              value={taskInput}
              placeholder="Enter Task"
              onChange={this.onChangeInput}
            />
            <button className="add-btn" type="submit" onClick={this.onAddTask}>
              Add
            </button>
          </div>
        </div>

        <div className="pending-tasks-container">
          <h1 className="field-headings">Pending Tasks</h1>
          <ul>
            {pendingTasks.length === 0
              ? null
              : pendingTasks.map(eachTodo => (
                  <EachToDo
                    key={eachTodo.id}
                    eachTodo={eachTodo}
                    onChangeTodoStatus={this.onChangeTodoStatus}
                    onDeleteTodo={this.onDeleteTodo}
                  />
                ))}
          </ul>
        </div>
        <div className="completed-tasks-container">
          <h1 className="field-headings">Completed Tasks</h1>
          <ul>
            {completedTasks.length === 0
              ? null
              : completedTasks.map(eachTodo => (
                  <EachToDo
                    key={eachTodo.id}
                    eachTodo={eachTodo}
                    onChangeTodoStatus={this.onChangeTodoStatus}
                    onDeleteTodo={this.onDeleteTodo}
                  />
                ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ToDoApp
