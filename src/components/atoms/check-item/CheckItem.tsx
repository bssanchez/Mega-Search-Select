import React from "react";
import { BiCheck } from "react-icons/bi";

import "./CheckItem.css";

type CheckItemType = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
};

const CheckItem: React.FC<CheckItemType> = ({
  icon = null,
  title = "",
  subtitle = "",
  selected = false,
  onClick = undefined,
}) => {
  return (
    <label
      className={`check-item-container ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      {icon && <i>{icon}</i>}
      <p>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </p>
      {selected && <i className="icon-check"><BiCheck /></i>}
    </label>
  );
};

export default CheckItem;
