import * as React from 'react';
import { SVGProps } from 'react';

export const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.333 5.001v-.666c0-.934 0-1.4-.181-1.757a1.667 1.667 0 0 0-.729-.728c-.356-.182-.823-.182-1.756-.182H8.333c-.933 0-1.4 0-1.756.182-.314.16-.569.414-.729.728-.181.357-.181.823-.181 1.757V5m1.666 4.584v4.166m3.334-4.166v4.166M1.5 5.001h15m-1.667 0v9.334c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092c-.534.273-1.235.273-2.635.273H7.167c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092c-.272-.535-.272-1.235-.272-2.635V5"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
