import React, {useEffect, useState} from 'react'
import {todolistAPI, UpdateTaskType} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        console.log('render1')
        todolistAPI.get()
            .then((res) => {
                console.log('Render2')
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.addTodolist('it-incubator')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "fae95c34-52ff-440d-a5ef-c825ff18f61d"
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '423ace15-e029-47fb-9468-117f3e45a9db'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'kik')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        console.log('render1')
        const todolistId = '88dc405d-4b40-4a69-bfb8-435d3e8b597e';
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                console.log('Render2')
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '88dc405d-4b40-4a69-bfb8-435d3e8b597e';
        todolistAPI.addTask('to go for a walk', todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '88dc405d-4b40-4a69-bfb8-435d3e8b597e';
        const taskId = "62a22959-5eee-4608-a024-5c9c1597d7c4"
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '88dc405d-4b40-4a69-bfb8-435d3e8b597e'
    const taskId = "7a58a13e-a4c9-475a-8639-2c35215d00fe"

    useEffect(() => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: 'fine', description: '',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: ""
        } as UpdateTaskType)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

