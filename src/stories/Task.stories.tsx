import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Task from '../Task';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Task> = {
        /* 👇 The title prop is optional.
         * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
         * to learn how to generate automatic titles
         */
        title: 'TODOLISTS/Task',
        component: Task,
        tags: ['autodocs'],
        args: {
            changeTaskStatus: action('Status changed inside Task'),
            updateTaskTitle: action('Title changed inside Task'),
            removeTask: action('Remove Button clicked changed inside Task'),
            task: {
                id: '12wsdewfijdei',
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: 'fgdosrg8rgjuh',
                startDate: '',
                description: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            todolistId: 'fgdosrg8rgjuh'
        }
    }
;

export default meta;

type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsNotDoneStory: Story = {};
export const TaskIsDoneStory: Story = {
    args: {
        task: {
            id: '12wsdewfijdei2343',
            title: 'CSS',
            status: TaskStatuses.Completed,
            todoListId: 'fgdosrg8rgjuh',
            startDate: '',
            description: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
    }
};

