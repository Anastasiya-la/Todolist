import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ActionsType = RemoveTaskACType | AddTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK' :
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        default:
            throw new Error('I don\'t understand this type')
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
export const thirdAC = () => {
    return {}
}


