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
        return instance.get('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title: title})
    }
}