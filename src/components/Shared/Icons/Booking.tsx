import * as React from 'react';
import { SVGProps } from 'react';

export const Booking = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m11.892 7.189-4.174 4.175a.747.747 0 0 1-1.057 0L4.108 8.809a.748.748 0 0 1 1.057-1.057L7.19 9.777l3.645-3.645a.748.748 0 1 1 1.057 1.057Zm1.863-5.694h-1.218V.748a.748.748 0 0 0-1.495 0v.747H4.958V.748a.748.748 0 1 0-1.495 0v.747H2.245A1.495 1.495 0 0 0 .75 2.991v11.514A1.495 1.495 0 0 0 2.245 16h11.51a1.495 1.495 0 0 0 1.495-1.495V2.99a1.496 1.496 0 0 0-1.495-1.496Z"
      fill="#9E9E9E"
    />
  </svg>
);
