import React, { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";
import Badge from "../../atoms/badge/Badge";
import CheckItem from "../../atoms/check-item/CheckItem";
import ItemTitle from "../../atoms/item-title/ItemTitle";

import "./Modal.css";

type DataGroupedType = {
  [key: string]: {
    countryName: string;
    items: Array<any>;
  };
};

type ModalType = {
  data: DataGroupedType & Array<any>;
  onChangeSelection?: (selections: Array<any>) => void;
  initSelectedItems?: Array<any>;
};

const Modal: React.FC<ModalType> = ({
  data = null,
  onChangeSelection = undefined,
  initSelectedItems = [],
}) => {
  const [selectedItems, setSelectedItems] = useState<Array<any>>([
    ...initSelectedItems,
  ]);

  const toggleSelectedItem = (item: any) => {
    let newItems = [];

    const actualItems = [...selectedItems];
    const exists = actualItems.some((i: any) => i.id === item.id);

    if (exists) {
      newItems = actualItems.filter((i: any) => i.id !== item.id);
    } else {
      newItems = [...actualItems, item];
    }

    setSelectedItems(newItems);
  };

  useEffect(() => {
    if (onChangeSelection) {
      onChangeSelection(selectedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <div className="modal-container">
      <div className="modal-body">
        <div className="results-container">
          <strong>Results</strong>
          <span>Enter a destination to see results.</span>
          {data && (
            <div className="results-container__list">
              {data[0] ? (
                <p>Hola</p>
              ) : (
                Object.keys(data).map((countryCode: string) => (
                  <div className="items-container">
                    <div className="items-container__heading">
                      <ItemTitle
                        flagCode={countryCode}
                        title={data[countryCode].countryName}
                      />
                    </div>
                    {data[countryCode]?.items?.map((item: any) => (
                      <div className="items-container__item">
                        <CheckItem
                          icon={<BiMap />}
                          title={item.name}
                          subtitle={item.location.locationData.name}
                          onClick={(evt) => {
                            toggleSelectedItem(item);
                          }}
                          selected={selectedItems.some(
                            (i: any) => i.id === item.id
                          )}
                        />
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="selection-container">
          <strong>Selected ({selectedItems.length})</strong>
          {selectedItems.length === 0 && <span>No destination selected.</span>}
          <div className="selection-container__list">
            {selectedItems.map((item: any) => (
              <Badge
                text={item.name}
                value={item.id}
                onCloseClick={() => {
                  toggleSelectedItem(item);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer"></div>
    </div>
  );
};

export default Modal;
