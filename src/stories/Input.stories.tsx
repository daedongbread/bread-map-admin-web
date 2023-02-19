import React from 'react';
import { Input } from '@/components/Shared';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Daedong/Input',
  component: Input,
  argTypes: {
    type: {
      control: false,
    },
    name: {
      control: false,
    },
    textType: {
      options: ['text', 'number'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Plain = Template.bind({});
Plain.args = {
  type: 'plain',
  textarea: false,
  textType: 'text',
  padding: 'small',
  placeholder: '텍스트를 입력해주세요.',
};

export const Gray = Template.bind({});
Gray.args = {
  type: 'gray',
  textarea: false,
  textType: 'text',
  padding: 'small',
  placeholder: '텍스트를 입력해주세요.',
};

export const Orange = Template.bind({});
Orange.args = {
  type: 'orange',
  textarea: false,
  textType: 'text',
  padding: 'small',
  placeholder: '텍스트를 입력해주세요.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'disabled',
  textarea: false,
  textType: 'text',
  padding: 'small',
  disabled: true,
  placeholder: '텍스트를 입력할 수 없는 인풋입니다.',
};
