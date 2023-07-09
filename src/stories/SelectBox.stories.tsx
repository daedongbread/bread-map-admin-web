import React from 'react';
import { BasicSelectOption, BasicSelectTrigger, SelectBox, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BAKERY_REPORT_STATUS_OPTIONS, BAKERY_STATUS_OPTIONS } from '@/constants';
import useSelectBox from '@/hooks/useSelectBox';

export default {
  title: 'Daedong/SelectBox',
  component: SelectBox,
  argTypes: {
    isOpen: {
      control: false,
    },
    triggerComponent: {
      control: false,
    },
    width: {
      control: false,
    },
  },
} as ComponentMeta<typeof SelectBox>;

export const BasicSelectBox: ComponentStory<typeof SelectBox> = () => {
  const { isOpen, selectedOption, onCloseSelectBox, onToggleSelectBox, onSelectOption } = useSelectBox();

  const selectBoxArgs = {
    width: 300,
    isOpen,
    onCloseSelectBox,
    onToggleSelectBox,
    triggerComponent: <BasicSelectTrigger selectedOption={selectedOption} />,
  };

  return (
    <SelectBox {...selectBoxArgs}>
      {BAKERY_STATUS_OPTIONS.map(option => (
        <BasicSelectOption option={option} onSelectOption={onSelectOption} />
      ))}
    </SelectBox>
  );
};

export const StatusSelectBox: ComponentStory<typeof SelectBox> = () => {
  const { isOpen, selectedOption, onCloseSelectBox, onToggleSelectBox, onSelectOption } = useSelectBox();

  const selectBoxArgs = {
    width: 300,
    isOpen,
    onCloseSelectBox,
    onToggleSelectBox,
    triggerComponent: <StatusSelectTrigger selectedOption={selectedOption} />,
  };

  return (
    <SelectBox {...selectBoxArgs}>
      {BAKERY_REPORT_STATUS_OPTIONS.map(option => (
        <StatusSelectOption active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectOption} />
      ))}
    </SelectBox>
  );
};
