import * as React from 'react';
import { SVGProps } from 'react';

export const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={31} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m26.25 26.719-5.438-5.438m2.938-7.062c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
      stroke="#222"
      strokeWidth={2.438}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
