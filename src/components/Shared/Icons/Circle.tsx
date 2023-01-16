import * as React from 'react';
import { SVGProps } from 'react';

export const Circle = (props: SVGProps<SVGSVGElement> & { fillcolor?: string }) => (
  <svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={3.5} cy={3.5} r={3.5} fill={props.fillcolor ?? '#FF6E40'} />
  </svg>
);
