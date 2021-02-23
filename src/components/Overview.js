import React, { Component } from "react";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editableKey: "",
      editedValue: "",
    };

    this.makeTaskEditable = this.makeTaskEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  makeTaskEditable = (id) => {
    this.setState({
      editableKey: id,
    });
  };

  handleChange(event) {
    this.setState({
      editedValue: event.target.value,
    });
  }

  handleEdit = (id, title) => {
    const { editTask } = this.props;
    editTask(id, title);

    this.setState({
      editableKey: "",
    });
  };

  render() {
    const { tasks, deleteTask } = this.props;
    const { editableKey, editedValue } = this.state;

    return (
      <div className="Overview">
        {tasks.map((task) => {
          if (editableKey === task.id) {
            return (
              <table>
                <tr key={task.id}>
                  <td>
                    <span>{task.title}</span>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      value={editedValue}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleEdit(task.id, editedValue)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </table>
            );
          } else {
            return (
              <table>
                <td>
                  <tr key={task.id}>
                    <td>
                      <span>{task.title}</span>
                    </td>
                    <td>
                      <button onClick={() => this.makeTaskEditable(task.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteTask(task.id)} key={task.id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </td>
              </table>
            );
          }
        })}
      </div>
    );
  }
}

export default Overview;
