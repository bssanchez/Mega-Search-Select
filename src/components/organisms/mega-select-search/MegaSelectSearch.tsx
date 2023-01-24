import React, { FunctionComponent } from "react";

import "./MegaSelectSearch.css";

type IMegaSelectSearch = {
  title: string;
};

const MegaSelectSearch: FunctionComponent<IMegaSelectSearch> = ({ title }) => {
  return <div className="mega-select-search-container">{title}</div>;
};

export default MegaSelectSearch;
