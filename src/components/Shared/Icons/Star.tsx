import * as React from 'react';
import { SVGProps } from 'react';

export const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4.8.279a.501.501 0 0 1 .9 0L6.933 2.77c.074.147.215.25.378.273l2.758.4c.412.059.576.566.277.855L8.354 6.234a.502.502 0 0 0-.145.445l.471 2.733a.501.501 0 0 1-.726.53L5.483 8.648a.501.501 0 0 0-.466 0l-2.47 1.294a.501.501 0 0 1-.727-.53l.47-2.733a.502.502 0 0 0-.144-.445L.153 4.299a.502.502 0 0 1 .277-.856l2.758-.399a.501.501 0 0 0 .378-.273L4.8.279Z"
      fill="#FF6E40"
    />
  </svg>
);
