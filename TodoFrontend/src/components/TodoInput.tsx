import React, {useEffect, useState} from 'react';
import {HandleSubmit, TodoType} from '../types';

const TodoInput: React.FC = () => {
  const [formInput, setformInput] = useState('');
  const [Todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event: HandleSubmit) => {
    event?.preventDefault();

    const currentInput = {
      message: formInput,
    };

    setTodos((prev) => [...prev, currentInput]);
    setformInput('');

    try {
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentInput),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeftClick = (element: TodoType) => {
    const updatedTodos = Todos.map((todo) => {
      if (todo.id === element.id) {
        try {
          fetch('http://localhost:3000/todo/' + element.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({completed: !element.completed}),
          });
        } catch (error) {
          console.log(error);
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleRightClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    element: TodoType
  ) => {
    event.preventDefault();
    const updatedTodos = Todos.filter((todo) => {
      if (todo.id === element.id) {
        try {
          fetch('http://localhost:3000/todo/' + element.id, {
            method: 'DELETE',
          });
        } catch (error) {
          console.log(error);
        }
      }
      return todo.id !== element.id;
    });
    setTodos(updatedTodos);
  };

  return (
    <form id="form" onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        id="input"
        className="input"
        placeholder="What needs to be done?"
        autoComplete="off"
        value={formInput}
        onChange={(e) => setformInput(e.target.value)}
      />
      <ul className="todos" id="todos">
        {Todos.map((element) => {
          return (
            <li
              key={element.id}
              onClick={() => handleLeftClick(element)}
              onContextMenu={(event) =>
                handleRightClick(event, element)
              }
              className={element.completed ? 'completed' : ''}
            >
              {element.message}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default TodoInput;
