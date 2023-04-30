import * as React from 'react';
import { SVGProps } from 'react';

export const Wifi = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 4.375c-2.754 0-5.264 1.075-7.152 2.844A.875.875 0 1 1 .652 5.942C2.847 3.885 5.779 2.625 9 2.625c3.22 0 6.153 1.26 8.348 3.317a.875.875 0 0 1-1.196 1.277C14.264 5.45 11.754 4.375 9 4.375Zm0 3.667c-1.771 0-3.39.672-4.627 1.786a.875.875 0 0 1-1.17-1.3 8.635 8.635 0 0 1 11.595 0 .875.875 0 1 1-1.171 1.3A6.885 6.885 0 0 0 9 8.042Zm0 3.666c-.805 0-1.545.284-2.131.764a.875.875 0 1 1-1.108-1.354 5.101 5.101 0 0 1 6.439-.032.875.875 0 1 1-1.095 1.365A3.35 3.35 0 0 0 9 11.708Z"
      fill="#9E9E9E"
    />
    <circle cx={9} cy={14.375} r={1.125} fill="#9E9E9E" />
  </svg>
);
