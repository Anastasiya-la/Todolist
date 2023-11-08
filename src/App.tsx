import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue
        }
        setTodolists([...todolists])
    }

    const removeTask = (todolistID: string, taskId: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskId)
        setTasks({...tasks});
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistID,
            startDate: '',
            description: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        };

        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    const changeStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        /*  let task = tasks[todolistID].find(t=>t.id===taskId)
          if(task){
              task.isDone=isDone
          }
          setTasks({...tasks})*/
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, status: status} : t)});
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists([...todolists].filter(tl => tl.id !== todolistID))
        delete tasks[todolistID];
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        let newTodolist: TodolistDomainType = {
            id: todolistID, title: title, filter: 'all', addedDate: '',
            order: 0
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
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
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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
}

export default App;
