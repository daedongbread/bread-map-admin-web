import React from 'react';
import { Button } from '@/components/Shared';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Daedong/Button',
  component: Button,
  argTypes: {
    type: {
      control: false,
    },
    backgroundColor: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Orange = Template.bind({});
Orange.args = {
  type: 'orange',
  text: 'orange',
  btnSize: 'small',
  fontSize: 'small',
};

export const LightOrange = Template.bind({});
LightOrange.args = {
  type: 'lightOrange',
  text: 'lightOrange',
  btnSize: 'small',
  fontSize: 'small',
};

export const ReverseOrange = Template.bind({});
ReverseOrange.args = {
  type: 'reverseOrange',
  text: 'reverseOrange',
  btnSize: 'small',
  fontSize: 'small',
};

export const Gray = Template.bind({});
Gray.args = {
  type: 'gray',
  text: 'gray',
  btnSize: 'small',
  fontSize: 'small',
};
