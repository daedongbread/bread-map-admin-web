import * as React from 'react';
import { SVGProps } from 'react';

export const Parking = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M14.286 0H1.714C.768 0 0 .756 0 1.688v12.374c0 .932.768 1.688 1.714 1.688h12.572c.946 0 1.714-.756 1.714-1.688V1.688C16 .755 15.232 0 14.286 0ZM8.57 10.125H6.857v1.688c0 .309-.257.562-.571.562H5.143a.569.569 0 0 1-.572-.563V3.939c0-.31.258-.563.572-.563H8.57C10.461 3.375 12 4.89 12 6.75s-1.54 3.375-3.429 3.375Zm0-4.5H6.857v2.25h1.714c.629 0 1.143-.506 1.143-1.125S9.2 5.625 8.571 5.625Z"
      fill="#9E9E9E"
    />
  </svg>
);
