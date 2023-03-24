import * as React from 'react';
import { SVGProps } from 'react';

export const Profile = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M14.333 16v-1.667A3.333 3.333 0 0 0 11 11H4.333A3.333 3.333 0 0 0 1 14.333V16M11 4.333a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0Z"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
