import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from "uniqid";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      tasks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const prevState = this.state;

    const task = {
      id: uniqid(),
      title: this.state.inputValue,
    };

    this.setState({
      tasks: [...prevState.tasks, task],
      inputValue: "",
    });
  }

  handleDelete(id) {
    console.log("task id: ", id);
    const tasks = this.state.tasks;

    const updatedTasks = tasks.filter((task) => task.id != id);

    this.setState({
      tasks: updatedTasks,
    });
  }

  handleEdit(id, title) {
    this.setState({
      tasks: this.state.tasks.map(el => (el.id === id ? Object.assign({}, el, { title }) : el))
    });
  }

  render() {
    const { inputValue, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Task: </label>
          <input
            onChange={this.handleChange}
            value={inputValue}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>
        <Overview
          tasks={tasks}
          deleteTask={this.handleDelete}
          editTask={this.handleEdit}
        />
      </div>
    );
  }
}

export default App;
