import {TasksStateType} from "../App";


export const tasksReducer = (state: TasksStateType, action: any) => {
    switch (action.type) {
        case '':
            return state
        case '' :
            return state
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const firstAC = () => {
    return {}
}
export const secondAC = () => {
    return {}
}

