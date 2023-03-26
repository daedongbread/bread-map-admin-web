import * as React from 'react';
import { SVGProps } from 'react';

export const Meal = (props: SVGProps<SVGSVGElement>) => (
  <svg width={15} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.754 7.642c.492-.608.77-1.312.77-2.058 0-2.346-2.766-4.25-6.178-4.25-3.413 0-6.18 1.904-6.18 4.25 0 .746.28 1.45.771 2.058v5.859c0 .958.78 1.737 1.738 1.737h7.342a1.74 1.74 0 0 0 1.737-1.737V7.642Z"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
