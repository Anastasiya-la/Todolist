import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            title: "What to learn",
            filter: "all"
        },
        {
            id: v1(),
            title: "What to buy",
            filter: "all"
        }
    ])

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all');


    const changeFilter = (buttonName: FilterValuesType) => {
        setFilter(buttonName);
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks]);
    }

    const changeStatus = (id: string, isDone: boolean) => {
        const newTask = tasks.find(t => t.id === id)
        if (newTask) {
            newTask.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    return (
        <div className="App">
            {todolists.map(tl => {

                let tasksForTodolist = tasks;

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }

                return (
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
                    />)
            })
            }

        </div>
    );
}

export default App;
