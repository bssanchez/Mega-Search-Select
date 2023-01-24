import React from "react";
import InputSearch from "../../molecules/input-search/InputSearch";

import "./MegaSelectSearch.css";

type IMegaSelectSearch = {
  title: string;
};

const MegaSelectSearch: React.FC<IMegaSelectSearch> = ({ title }) => {
  return (
    <div className="mega-select-search-container">
      {title}
      <InputSearch labelText="Destination" placeholderText="Search" />
    </div>
  );
};

export default MegaSelectSearch;
