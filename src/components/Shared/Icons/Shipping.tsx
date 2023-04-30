import * as React from 'react';
import { SVGProps } from 'react';

export const Shipping = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 4H.5v9.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4h-4.75v4.457a.812.812 0 0 1-1.221.702L8 8.269l-1.529.89a.812.812 0 0 1-1.221-.702V4Zm4.5 0h-3.5v4.13l1.341-.78a.812.812 0 0 1 .818 0l1.341.78V4Z"
      fill="#9E9E9E"
    />
    <path d="M2.004.952A1 1 0 0 1 2.84.5h10.318a1 1 0 0 1 .837.452L15.5 3.25H.5L2.004.952Z" fill="#9E9E9E" />
  </svg>
);
