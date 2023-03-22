import React from 'react';
import { ImgManager } from '@/components/Shared';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Daedong/ImgManager',
  component: ImgManager,
  argTypes: {
    downloadUrl: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof ImgManager>;

const Template: ComponentStory<typeof ImgManager> = args => <ImgManager {...args} />;

export const NewAndSelectedImg = Template.bind({});
NewAndSelectedImg.args = {
  isNew: true,
  isSelected: true,
  downloadUrl: 'http://placehold.it/320x300',
};

export const OldAndNotSelectedImg = Template.bind({});
OldAndNotSelectedImg.args = {
  isNew: false,
  isSelected: false,
  downloadUrl: 'http://placehold.it/320x300',
};
