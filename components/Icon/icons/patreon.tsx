import React from "react";

export function PatreonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <path
          fill="#052D49"
          d="M3.602 0h16.796A3.603 3.603 0 0124 3.602v16.796A3.603 3.603 0 0120.398 24H3.602A3.603 3.603 0 010 20.398V3.602A3.603 3.603 0 013.602 0zm0 0"
        ></path>
        <path
          fill="#FFF"
          d="M20.484 10.266a5.156 5.156 0 11-10.312 0 5.156 5.156 0 0110.312 0zm0 0"
        ></path>
        <path fill="#F96854" d="M8.672 18.844V5.109H6.14v13.735zm0 0"></path>
      </g>
    </svg>
  );
}
