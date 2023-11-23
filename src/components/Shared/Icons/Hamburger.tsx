import * as React from 'react';
import { SVGProps } from 'react';
import { color } from '@/styles';

export const Hamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg width="30" height="18" viewBox="0 0 30 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="1" width="20" height="2.5" rx="1" fill={color.gray500} />
    <rect x="2" y="7.5" width="20" height="2.5" rx="1" fill={color.gray500} />
    <rect x="2" y="14" width="20" height="2.5" rx="1" fill={color.gray500} />
  </svg>
);
