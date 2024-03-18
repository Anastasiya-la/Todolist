import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskTC,
    changeTaskTitleTC,
    removeTaskTC,
    updateTaskStatusTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch() // типизированный диспатч

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }, [])


    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(removeTaskTC(taskId, todolistID))
    }, [])


    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(title, todolistID))
    }, [])


    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistID, taskId, status))
    }, [])


    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const updateTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(taskId, newTitle, todolistId))
    }, [])


    const updateTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))

    }, [])


    return (
        <div className="App">
            <AppBar position="static" color={'secondary'}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        TodoLists
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{p: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {


                        return (
                            <Grid item key={tl.id}>
                                <Paper sx={{p: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithRedux;
