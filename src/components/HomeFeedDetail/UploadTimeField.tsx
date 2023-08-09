import React, { useEffect } from 'react';
import { BasicSelectOption, BasicSelectTrigger, SelectBox, SelectOption } from '@/components/Shared';
import { TIME_OPTIONS } from '@/constants/homeFeed';
import useSelectBox from '@/hooks/useSelectBox';
import { color } from '@/styles';

type Props = {
  time: string;
  onSelectUploadTime: (time: string) => void;
};

export const UploadTimeField = ({ time, onSelectUploadTime }: Props) => {
  // TODO: 시간

  const { isOpen, selectedOption, onSelectOption: onSelectUploadTimeOption, onToggleSelectBox, onCloseSelectBox } = useSelectBox(TIME_OPTIONS[0]);

  useEffect(() => {
    const updatedTime = time === '00:00' ? '00:00:00' : time;
    onSelectUploadTime(updatedTime);
    onSelectUploadTimeOption(TIME_OPTIONS.find(option => option.value === updatedTime) || null);
  }, [time]);

  const handleSelectOption = (option: SelectOption | null) => {
    onSelectUploadTime((option?.value as string) || '');
    onSelectUploadTimeOption(option);
  };

  return (
    <SelectBox
      width={150}
      isOpen={isOpen}
      onCloseSelectBox={onCloseSelectBox}
      onToggleSelectBox={onToggleSelectBox}
      // onToggleSelectBox={() => onToggleLinkOption(idx)}
      triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} bgColor={color.white} />}
    >
      {TIME_OPTIONS.map((option, idx) => (
        <BasicSelectOption key={idx} option={option} onSelectOption={handleSelectOption} />
      ))}
    </SelectBox>
  );
};
