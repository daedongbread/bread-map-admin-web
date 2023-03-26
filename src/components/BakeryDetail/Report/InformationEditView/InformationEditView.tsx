import React from 'react';
import { InfoEditRequestCard } from '@/components/BakeryDetail/Report/InformationEditView/InfoEditRequestCard';
import { Divider } from '@/styles';

const TEMP_SIZE = 5;

export const InformationEditView = () => {
  return (
    <div>
      {Array(TEMP_SIZE)
        .fill(0)
        .map((item, idx) => {
          return (
            <>
              <InfoEditRequestCard />
              {idx < TEMP_SIZE - 1 && <Divider />}
            </>
          );
        })}
    </div>
  );
};
