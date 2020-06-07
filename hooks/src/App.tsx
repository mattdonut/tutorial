import React, { FC } from 'react';
import data from './todos.json'
import { TodoItem } from './TodoItem'

const App: FC = () => {
  return (
    <div className="App">
      {data.map(todo => <TodoItem todo={todo} />)}
    </div>
  );
}

export default App;
