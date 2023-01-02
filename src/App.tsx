import React, { useState } from 'react';
import './App.css';

function App() {
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    // document.getElementById('inputText').textContent = ''
    setInputValue("")
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id){
        todo.inputValue = inputValue
      }
      return todo;
    })
    setTodos(newTodos)
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id){
        // todo.checked = !checked
        return {...todo, checked: !todo.checked}
      }
      return todo;
    })
    setTodos(newTodos)
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="" id="inputText" onChange={(e) => handleChange(e)} className="inputText" value={inputValue}/>
          <input type="submit" value="create" className='submitBtn'/>
        </form>
        <ul className='todoList'>
          {/* mapでlistを見にいき、ある分だけリストを作成 */}
          {todos.map(todo => (
            <li key={todo.id}>
              <input type="text" name="" id="" onChange={(e) => handleEdit(todo.id, e.target.value)} className="inputText" value={todo.inputValue} disabled={todo.checked}/>
              <input type="checkbox" onChange={(e) => handleChecked(todo.id, todo.checked)}/>
              <button onClick={() => handleDelete(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
