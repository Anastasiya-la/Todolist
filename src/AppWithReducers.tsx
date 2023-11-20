import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/*function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },

        ],
        [todolistID2]: [
            {
                id: v1(),
                title: 'Rest API',
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    })


    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filterValue))
    }

    const removeTask = (todolistID: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistID))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatchToTasks(addTaskAC(title, todolistID))
    }

    const changeStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatchToTasks(changeTaskStatusAC(taskId, status, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }

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

                        let tasksForTodolist = tasks[tl.id];

                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status===TaskStatuses.New);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status===TaskStatuses.Completed);
                        }

                        return (
                            <Grid item>
                                <Paper sx={{p: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
}*/

/*export default AppWithReducers;*/
