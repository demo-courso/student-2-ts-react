import { useState } from 'react';
import { faker } from '@faker-js/faker';
import clsx from "clsx";

interface Todo {
  label: string;
  status: 'open' | 'done' | 'archived';
  id: string;
}

const generateFakeTodoItem = (): Todo  => ({
  label: faker.hacker.phrase(),
  status: faker.random.arrayElement(['open', 'done', 'archived']),
  id: faker.random.uuid(),
});

const generateNTodo = (size: number): Todo[] => {
  return Array.from(Array(size).keys()).map(generateFakeTodoItem);
};

const initialList: Todo[] = [
  {
    label: 'This is my first todo item',
    status: 'open',
    id: faker.random.uuid(),
  },
  {
    label: 'This is some done todo',
    status: 'done',
    id: faker.random.uuid(),
  },
  {
    label: 'This is a really old todo',
    status: 'archived',
    id: faker.random.uuid(),
  },
  ...generateNTodo(10),
];

interface TodoItemProps {
  status: Todo['status'];
  label: Todo['label'];
  onChecked: (status: Todo['status']) => void;
}


const TodoItem = ({ status, label, onChecked }: TodoItemProps) => {
  return (
    <div
      className={clsx('p-4 flex items-center', {
        'bg-gray-200': status === 'archived',
      })}
    >
      <span
        className={clsx('w-full block', { 'line-through': status !== 'open' })}
      >
        {label}
      </span>
      <input
        checked={status !== 'open'}
        disabled={status === 'archived'}
        type="checkbox"
        className="rounded text-pink-500 ml-8 cursor-pointer disabled:cursor-not-allowed disabled:bg-black disabled:hover:bg-black"
        onChange={() => onChecked(status === 'open' ? 'done' : 'open')}
      />
    </div>
  );
};


function App() {
  const [todoList, setTodoList] = useState<Todo[]>(initialList);

  const updater =  (id: string, newStatus: Todo['status']) => {
    setTodoList((oldList) =>
      oldList.map((it) => {
        if (it.id !== id) {
          return it;
        }
        return {
          ...it,
          status: newStatus,
        };
      }),
    );
  };

  return (
    <div className="bg-white shadow rounded-lg py-8">
      <div className="divide-gray-300 divide-y">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            label={item.label}
            status={item.status}
            onChecked={(newState) => updater(item.id, newState)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
