import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

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
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {


    const onAllClickHandler = () => props.changeFilter('all', props.todolistId);


    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId);


    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId);

    const onClickDelTodolistHandler = () => props.removeTodolist(props.todolistId)

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title);
    }

    const updateTodolistTitle = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onChange={updateTodolistTitle}/>
                <button onClick={onClickDelTodolistHandler}>x</button>

            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((t) => {

                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, t.id);
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    const updateTitle = (newTitle: string) => {
                        props.updateTaskTitle(props.todolistId, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan oldTitle={t.title} onChange={updateTitle}/>
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
