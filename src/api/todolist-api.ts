import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9fd86adc-bb5c-4682-a108-96413caf4103'
    }
})

export const todolistAPI = {
    get() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<CreateTodolistResponseType>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}

type UpdateTodolistResponseType  = {
    data: {}
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
