import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (buttonName: FilterValuesType, todolistId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId);


    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId);


    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId);

    const onClickDelTodolistHandler = () => props.removeTodolist(props.todolistId)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickDelTodolistHandler}>x</button>

            </h3>
            <div>
                <input onKeyDown={onKeyDownHandler} value={title} onChange={onChangeHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={"error-message"}>{error}</div>}
            <ul>
                {props.tasks.map((t) => {

                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, t.id);
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>X
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>
                    All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>
                    Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>
                    Completed
                </button>
            </div>
        </div>
    );
}
