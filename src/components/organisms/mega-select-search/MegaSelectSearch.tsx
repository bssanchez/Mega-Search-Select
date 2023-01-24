import React from "react";
import { BiMap } from "react-icons/bi";

import CheckItem from "../../atoms/check-item/CheckItem";
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
      <CheckItem
        title="Toronto"
        subtitle="ON, Canada"
        icon={<BiMap />}
        selected={true}
      />
    </div>
  );
};

export default MegaSelectSearch;
