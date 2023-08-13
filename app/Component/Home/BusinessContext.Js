import { createContext } from 'react';

export const BusinessContext = createContext({
  selectedBusiness: null,
  setSelectedBusiness: () => {}, 
});
