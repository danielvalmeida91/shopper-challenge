import React, { createContext, useState, useContext } from 'react';

export interface IShopperContext {
  origin: {
    latitude: number;
    longitude: number;
    description: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    description: string;
  };
  distance: number;
  duration: string;
  options: Array<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }>;
  customer_id: number;
}

const DEFAULT_CONTEXT_VALUE: IShopperContext = {

  origin: {
    description: '',
    latitude: 0,
    longitude: 0
  },
  destination: {
    description: '',
    latitude: 0,
    longitude: 0
  },
  distance: 0,
  duration: '',
  options: [],
  customer_id: 0
}

const ShopperContext = createContext({
  data: DEFAULT_CONTEXT_VALUE,
  updateDataContext: (newData: IShopperContext) => { }
});

export const ShopperProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataRide, setDataRide] = useState({});

  const updateDataContext = (newData: IShopperContext) => {
    setDataRide(newData);
  };

  return (
    <ShopperContext.Provider value={{ data: dataRide, updateDataContext }}>
      {children}
    </ShopperContext.Provider >
  );
};

export const useShopper = () => {
  return useContext(ShopperContext);
};
