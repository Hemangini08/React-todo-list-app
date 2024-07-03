import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOrEditTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          ...updatedTodos[editIndex],
          text: inputValue
        };
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([
          ...todos,
          {
            id: Date.now(),
            text: inputValue,
            completed: false
          }
        ]);
      }
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  return (
    <>
      <center>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Todo App</h1>
          <div className="input-group mb-3" style={{ width: "50%" }}>
            <input
              type="text"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add todo..."
            />
            <button
              className={`btn ${editIndex !== null ? 'btn-warning' : 'btn-primary'}`}
              onClick={handleAddOrEditTodo}
            >
              {editIndex !== null ? 'Edit Todo' : 'Add Todo'}
            </button>
          </div>
          <table className="table" style={{ width: "50%" }}>
            <thead>
              <tr>
                <th scope="col">Todo</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>{todo.text}</span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => editTodo(index)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
};

export default TodoApp;
