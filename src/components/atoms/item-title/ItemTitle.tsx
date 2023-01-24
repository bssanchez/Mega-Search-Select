import React from "react";
import Flag from 'react-world-flags';

import "./ItemTitle.css";

type ItemTitleType = {
  flagCode?: string;
  title?: string;
};

const ItemTitle: React.FC<ItemTitleType> = ({ flagCode = null, title = "" }) => {
  return (
    <h4 className="item-title-container">
      {flagCode && <Flag code={flagCode} />} <span>{title}</span>
    </h4>
  );
};

export default ItemTitle;
