import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import EditableSpan from "../components/EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EditableSpan> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        oldTitle: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }

    }
};

export default meta;

type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {
    args: {
        oldTitle: 'title',
        onChange: action('Value EditableSpan changed')
    }
};


