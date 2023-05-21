import * as React from 'react';
import { SVGProps } from 'react';

export const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/가2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m13.813 12 5.651-5.652a1.2 1.2 0 0 0-1.697-1.698l-5.65 5.652L6.463 4.65a1.201 1.201 0 0 0-1.697 1.698L10.42 12 4.767 17.65a1.202 1.202 0 0 0 .85 2.05c.306 0 .613-.118.847-.352l5.652-5.652 5.651 5.652a1.196 1.196 0 0 0 1.697 0 1.2 1.2 0 0 0 0-1.698L13.814 12Z"
      fill="#222"
    />
  </svg>
);
