import React from 'react';
import { SelectableImg, SelectPreviewImg } from '@/components/Shared';

export const MenuEditView = () => {
  return (
    <div>
      <SelectPreviewImg isCurrent={true} isSelected={true} isCompleted={true} />
      <SelectableImg isSelected={false} />
    </div>
  );
};
