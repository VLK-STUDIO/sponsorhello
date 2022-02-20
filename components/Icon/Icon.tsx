import React from "react";
import { icons } from "./icons";

type Props = {
  name: keyof typeof icons;
};

function getIcon(name: string) {
  return icons[name.toLowerCase()] || icons.generic;
}

export const Icon: React.VFC<Props> = ({ name }) => {
  return getIcon(name);
};
