import * as React from 'react';
import { SVGProps } from 'react';

export const NewBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={9} cy={9} r={9} fill="#FF6E40" />
    <path d="M12.793 4.516h-1.746v5.39h-.082l-3.703-5.39H5.715V13h1.758V7.61h.07L11.27 13h1.523V4.516Z" fill="#fff" />
  </svg>
);
