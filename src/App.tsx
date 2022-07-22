import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all');


    const changeFilter = (buttonName: FilterValuesType) => {
        setFilter(buttonName);
    }

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const removeTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
