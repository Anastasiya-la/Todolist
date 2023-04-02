import {TasksStateType} from "../App";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ActionsType = RemoveTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
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
export const secondAC = () => {
    return {}
}
export const thirdAC = () => {
    return {}
}


