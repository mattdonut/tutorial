import React, { FC } from 'react'
import { Todo } from './TodoTypes'

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    return (
        <div>
            <input type="checkbox" checked={todo.done} />
            <label>{todo.text}</label>
        </div>
    )
}