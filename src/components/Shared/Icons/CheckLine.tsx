import * as React from 'react';
import { SVGProps } from 'react';

export const CheckLine = (props: SVGProps<SVGSVGElement>) => (
  <svg width={15} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 5.444 5 9l9-8" stroke="#EEE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
