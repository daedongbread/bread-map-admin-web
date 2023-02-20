import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { SideBar } from '@/components/Layout/SideBar';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Daedong/SideBar',
  component: SideBar,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = args => <SideBar {...args} />;

export const AdminMenu = Template.bind({});
AdminMenu.args = {};
