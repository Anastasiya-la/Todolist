import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type ActionsType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType
    | setTodolistsActionType


export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type addTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type setTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todos: TodolistType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS' :
            return action.todos.map((tl) => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (newTitle: string): addTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTitle,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string): changeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTitle
    }
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): changeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter
    }
}

export const setTodolistsAC = (todos: TodolistType[]): setTodolistsActionType => {
    return {
        type: 'SET-TODOLISTS',
        todos
    }
}

export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistAPI.get().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}
