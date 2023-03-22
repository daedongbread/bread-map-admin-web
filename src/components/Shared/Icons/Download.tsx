import * as React from 'react';
import { SVGProps } from 'react';

export const Download = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.5 10.5v1c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273h-7c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C1.5 13.6 1.5 12.9 1.5 11.5v-1m11.667-4.167L9 10.5m0 0L4.833 6.333M9 10.5v-9"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
