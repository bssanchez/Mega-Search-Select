import React from "react";
import { VscClose } from "react-icons/vsc";

import "./Badge.css";

type BadgeType = {
  text: string;
  value: any;
  onCloseClick?: (value: any) => void;
};

const Badge: React.FC<BadgeType> = ({ text, value, onCloseClick = undefined }) => {
  return (
    <span className="badge-container">
      <span>{text}</span> <VscClose onClick={onCloseClick} size={20} />
    </span>
  );
};

export default Badge;
