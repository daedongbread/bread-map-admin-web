import React from 'react';
import { Header } from '@/components/Shared';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Daedong/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const PageHeader = Template.bind({});
PageHeader.args = {
  name: 'Header',
};
