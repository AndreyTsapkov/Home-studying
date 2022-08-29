import React, { Component } from 'react';
// import { ReactComponent as AddIcon } from './icons/add.svg';
import shortid from 'shortid';
import TodoList from 'components/TodoList';
import TodoEditor from 'components/TodoEditor';
import Filter from 'components/TodoFilter';
import Modal from 'components/Modal';
import IconButton from 'components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import Clock from 'components/Clock';
// import Tabs from 'components/Tabs';
import Reader from 'components/Reader/Reader';
import initialTodos from './todos.json';
// import tabs from './tabs.json';
import publications from './publications.json';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredTodos = () => {
    const { filter, todos } = this.state;

    const normilizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normilizedFilter)
    );
  };

  calcCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;

    const totalTodosCount = todos.length;
    const completedTodosCount = this.calcCompletedTodos();
    const filteredTodos = this.getFilteredTodos();

    return (
      <>
        <Reader items={publications}></Reader>

        {/* <Tabs items={tabs} /> */}
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="white" />
        </IconButton>

        {/* <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSumbit={this.addTodo} />
          </Modal>
        )}

        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <span>Кол-во выполненных: {completedTodosCount}</span>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={filteredTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </>
    );
  }
}

export default App;
