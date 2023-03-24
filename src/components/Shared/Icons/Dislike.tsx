import * as React from 'react';
import { SVGProps } from 'react';

export const Dislike = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={19} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.326 4.69v7.526c0 .297.09.586.252.83L8.6 16.053c.319.482 1.111.823 1.785.57.726-.244 1.208-1.059 1.052-1.784l-.385-2.423a.743.743 0 0 1 .156-.577.689.689 0 0 1 .51-.23h3.045c.585 0 1.09-.237 1.385-.652.282-.4.334-.918.149-1.444l-1.823-5.549c-.23-.918-1.23-1.666-2.222-1.666H9.363c-.496 0-1.192.17-1.51.489l-.949.733a1.47 1.47 0 0 0-.578 1.17ZM4.382 14h-.764C2.468 14 2 13.536 2 12.391V4.609C2 3.464 2.468 3 3.618 3h.764C5.532 3 6 3.464 6 4.609v7.782C6 13.536 5.532 14 4.382 14Z"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
