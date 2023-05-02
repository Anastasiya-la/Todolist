import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from "./App";
import './App.css';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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

export const Todolist = memo((props: TodolistPropsType) => {

    console.log('Todolist called')

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId);


    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId);


    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId);

    const onClickDelTodolistHandler = () => props.removeTodolist(props.todolistId)

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title);
    }, [])

    const updateTodolistTitle = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistId, newTitle)
    }

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onChange={updateTodolistTitle}/>
                <IconButton onClick={onClickDelTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler} color={'secondary'}/>
                        <EditableSpan oldTitle={t.title} onChange={updateTitle}/>
                        <IconButton
                            onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>


                })}
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color={'secondary'}>
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'secondary'}
                >
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    );
})
