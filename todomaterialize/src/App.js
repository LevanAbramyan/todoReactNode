/* eslint-disable default-case */
import React, { Component } from 'react';
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import Footer from './components/Footer'
import axios from 'axios';



class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: { text: '', key: '', status: '' },
      task: '',
      selectAll: true,
      filterMode: 'all',
    }
  }
  componentDidMount = async () => {
    await this.filteR();
  };

  addTask = async () => {
    try {
      const { task } = this.state;
      await axios.post('http://localhost:8000/api/task/', { text: task, status: false, user_id: 1 });
      // await this.filteR();
    } catch (err) {
      console.log(err);
    }
  };
  updateTask = async (task) => {
    try {
      await axios.patch('http://localhost:8000/api/task/', task);
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  };
  deleteTask = async (task) => {
    try {

      await axios.delete(`http://localhost:8000/api/task/${task.id}`);
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  }
  filteR = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/filter?filterMode=${this.state.filterMode}&userId=1`);
  
      this.setState({
        items: data.tasks,
        left: data.count,
      })

    } catch (err) {
      console.log(err);
    }
  }
  getLeft = async () => {
    try {
      const { amount } = await axios.get('http://localhost:8000/api/left/');
      this.setState({ items: amount })

    } catch (err) {
      console.log(err);
    }
  };
  allMode = async () => {
    try {
      await this.setState({
        filterMode: 'all',
      });
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  };
  activeMode = async () => {
    try {
      await this.setState({
        filterMode: 'active',
      });
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  };
  completedMode = async () => {
    try {

      await this.setState({
        filterMode: 'completed',
      });
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  };
  clearComplete = async () => {
    try {
      await axios.delete('http://localhost:8000/api/clear/');
      await this.filteR();
    } catch (err) {
      console.log(err);
    }
  }
  toggle = async () => {
    try {
      const { selectAll } = this.state;
      await axios.patch(`http://localhost:8000/api/toggle/?selectAll=${this.state.selectAll}&id=1`);
      await this.filteR();
      this.setState({
        selectAll: !selectAll,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleInput = e => {
    const task = e.target.value;
    this.setState({
      task,
    })
  };

  handleStatusChange = async ({ target }, task) => {
    task.status = target.checked;
    await this.updateTask(task);
  };

  render() {

    const { items, left } = this.state;
    // const left = items.filter((item) => item.status === false).length;

    return (
      <>
        <h1>todos</h1>
        <div className="todo-list">
          <Header
            task={this.state.task}
            handleInput={this.handleInput}
            addTask={this.addTask}
            toggle={this.toggle}
          />

          {items && items.map((item) => {
            return (
              <TodoItem
                key={item.id} item={item}
                handleStatusChange={this.handleStatusChange}
                deleteTask={this.deleteTask}
                editTask={this.editTask}
                updateTask={this.updateTask}

              />
            )
          })}

          <Footer
            left={left}
            filterMode={this.state.filterMode}
            filteR={this.filteR}
            clearComplete={this.clearComplete}
            activeMode={this.activeMode}
            completedMode={this.completedMode}
            allMode={this.allMode}
          />

        </div>
      </>
    );
  }
}

export default App;
