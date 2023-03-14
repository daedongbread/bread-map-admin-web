import React from 'react';
import { SelectableImg, SelectPreviewImg } from '@/components/Shared';

export const MenuEditView = () => {
  return (
    <div>
      <SelectPreviewImg isCurrent={false} isSelected={false} isCompleted={false} />
      <SelectableImg isSelected={false} />
    </div>
  );
};
