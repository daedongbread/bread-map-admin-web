import React from 'react';
import { SelectableImg, SelectPreviewImg } from '@/components/Shared';

export const SelectableMenuCard = () => {
  return (
    <div>
      <div>2021.03.11</div>
      <div>
        <SelectableImg isSelected={false} />
        <div>
          <div></div>
          <div>
            {Array(9)
              .fill(0)
              .map((item, idx) => (
                <SelectPreviewImg isCurrent={true} isSelected={true} isCompleted={false} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
