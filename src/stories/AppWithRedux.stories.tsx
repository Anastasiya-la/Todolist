import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AppWithRedux> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;

type Story = StoryObj<typeof AppWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AppWithReduxStory: Story = {};


