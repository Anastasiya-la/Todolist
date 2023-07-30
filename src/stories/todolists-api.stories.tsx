import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9fd86adc-bb5c-4682-a108-96413caf4103'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        console.log('render1')
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'it-incubator'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "918dc9f8-0707-460b-8a27-ceafc17e7859"
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
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
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Outcomes'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

