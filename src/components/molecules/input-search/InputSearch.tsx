import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import "./InputSearch.css";

type InputSearchType = {
  labelText?: string;
  placeholderText?: string;
  onTextChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onFocusChange?: (event: boolean) => void;
};

const InputSearch: React.FC<InputSearchType> = ({
  labelText = "",
  placeholderText = "",
  onTextChange = undefined,
  onFocusChange = undefined,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (onFocusChange && typeof onFocusChange === 'function') {
      onFocusChange(isFocused);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <div className={`input-search-container ${isFocused ? "active" : ""}`}>
      <div>
        {labelText && <label>{labelText}</label>}
        <input
          type="search"
          placeholder={placeholderText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onTextChange}
        />
      </div>
      <i>
        <BiSearchAlt2 color="#727272" size={20} />
      </i>
    </div>
  );
};

export default InputSearch;
