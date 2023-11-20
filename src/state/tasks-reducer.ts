import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type SetTasksACType = ReturnType<typeof setTasksAC>
type ActionsType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | addTodolistActionType
    | removeTodolistActionType
    | setTodolistsActionType
    | SetTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK' :
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.todolistId,
                    startDate: '',
                    description: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                }, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE-TASK-TITLE' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        status,
        todolistId
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId
    } as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId))
    })
}
