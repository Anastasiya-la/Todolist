import {TasksStateType} from "../App";
import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

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
        case 'ADD-TASK' : {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}
export const  changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
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
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.addTask(title, todolistId).then((res) => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskStatusTC = (todolistID: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks
    const task = allTasksFromState[todolistID].find(t => t.id === taskId)
    if (task) {
        todolistAPI.updateTask(todolistID, taskId, {
            description: task.description,
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then((res) => {
            dispatch(changeTaskStatusAC(taskId, status, todolistID))
        })

    }
}