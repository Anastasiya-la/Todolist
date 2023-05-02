import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";


type TaskPropsType = {
    task: TaskType
    removeTask: (todolistID: string, taskId: string) => void
    todolistId: string
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void

}
const Task = memo((props: TaskPropsType) => {
    console.log('task')

    const onClickHandler = useCallback(() => {
        props.removeTask(props.todolistId, props.task.id);
    }, [props.removeTask, props.todolistId, props.task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
    }, [props.changeTaskStatus, props.todolistId, props.task.id])

    const updateTitle = useCallback((newTitle: string) => {
        props.updateTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.updateTaskTitle, props.task.id, props.todolistId])
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onChangeHandler} color={'secondary'}/>
        <EditableSpan oldTitle={props.task.title} onChange={updateTitle}/>
        <IconButton
            onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>

});

export default Task;