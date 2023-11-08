import React, {memo, useCallback} from 'react';
import './App.css';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Task from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (buttonName: FilterValuesType, todolistId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    filter: FilterValuesType
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

/*export type TaskType = {
    id: string
    title: string
   status: TaskStatuses
}*/

export const Todolist = memo((props: TodolistPropsType) => {

    console.log('Todolist called')


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.changeFilter, props.todolistId]);

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.changeFilter, props.todolistId]);


    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.changeFilter, props.todolistId]);

    const onClickDelTodolistHandler = () => props.removeTodolist(props.todolistId)

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title);
    }, [props.addTask, props.todolistId])

    const updateTodolistTitle = useCallback((newTitle: string) => {
        props.updateTodolistTitle(props.todolistId, newTitle)
    }, [props.updateTodolistTitle, props.todolistId])

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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
                {tasksForTodolist.map((t) => {
                    return (<Task removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} task={t}
                                  updateTaskTitle={props.updateTaskTitle} todolistId={props.todolistId} key={t.id}/>)

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
