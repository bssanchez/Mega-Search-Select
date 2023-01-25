import React, { useEffect, useState } from "react";

import InputSearch from "../../molecules/input-search/InputSearch";
import Modal from "../modal/Modal";
import COUNTRIES from "./countries";
import INFODATA from "./data";

import "./MegaSelectSearch.css";

type IMegaSelectSearch = {
  title: string;
};

const MegaSelectSearch: React.FC<IMegaSelectSearch> = ({ title }) => {
  const { data } = INFODATA;
  const [modals, setModals] = useState<any>({
    destinations: {
      show: false,
      data: [],
    },
    providers: {
      show: false,
      data: {},
    },
  });

  const [selections, setSelections] = useState<any>({
    destinations: [],
    providers: [],
  });

  const showModalSearch = (modalKey: string, show: boolean) => {
    if (show) {
      const resetShowStates: any = {
        destinations: { data: modals.destinations.data, show: false },
        providers: { data: modals.providers.data, show: false },
      };

      resetShowStates[modalKey].show = show;
      setModals(resetShowStates);
    }
  };

  const saveSelections = (modalKey: string, selection: any) => {
    const actualSelections = {...selections};
    actualSelections[modalKey] = selection;

    setSelections(actualSelections);
  };

  const filterItems = (modalKey: string, target: any) => {
    const actualModalsData = {...modals};
    const searchTerm = target.value.toLowerCase();
    const allItems = data.getAvailableFiltersForLanguageSearch.campuses;

    const filteredData = allItems.filter((item: any) => {
      const itemName = item.name.toLowerCase();
      return itemName.indexOf(searchTerm) > -1;
    });

    actualModalsData[modalKey].data = groupProviders(filteredData);
    setModals(actualModalsData);
  };

  const groupProviders = (providers: any) => {
    const groupedProviders: any = {};
    const destinations: any = data.getAvailableFiltersForLanguageSearch.locations;

    for (const provider of providers) {
      if (!groupedProviders[provider.location.country]) {
        groupedProviders[provider.location.country] = {
          countryName: COUNTRIES[provider.location.country],
          items: [],
        };
      }

      provider.location = {
        ...provider.location,
        locationData: destinations.find(
          (l: any) => l.id === provider.location.id
        ),
      };

      groupedProviders[provider.location.country].items.push(provider);
    }

    return groupedProviders;
  };

  useEffect(() => {
    const providers: any = data.getAvailableFiltersForLanguageSearch.campuses;

    setModals((prevModal: any) => ({
      ...prevModal,
      providers: { ...prevModal.providers, data: groupProviders(providers) },
      destinations: { ...prevModal.destinations, data: [] },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mega-select-search-container">
      <div className="form-group">
        <InputSearch
          labelText="Providers"
          placeholderText="Search"
          onFocusChange={(show) => {
            showModalSearch("providers", show);
          }}
          onTextChange={(event) => filterItems("providers", event.target)}
        />
        {modals?.providers?.show && (
          <Modal
            data={modals.providers.data}
            onChangeSelection={(sel) => saveSelections("providers", sel)}
            initSelectedItems={selections.providers}
          />
        )}
      </div>
      <div className="form-group">
        <InputSearch
          labelText="Destinations"
          placeholderText="Any"
          onFocusChange={(show) => {
            showModalSearch("destinations", show);
          }}
        />
        {modals?.destinations?.show && <Modal data={modals.destinations.data} />}
      </div>
    </div>
  );
};

export default MegaSelectSearch;
