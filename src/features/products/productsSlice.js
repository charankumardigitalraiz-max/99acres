import { createSlice } from '@reduxjs/toolkit';
import { propertiesData } from '../../data/mockData';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: propertiesData,
    searchQuery: '',
    typeFilter: 'All',
    statusFilter: 'All',
    cityFilter: 'All',
    currentPage: 1,
    pageSize: 8,
    selectedProperty: null,
  },
  reducers: {
    setSearch: (state, action) => { state.searchQuery = action.payload; state.currentPage = 1; },
    setTypeFilter: (state, action) => { state.typeFilter = action.payload; state.currentPage = 1; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; state.currentPage = 1; },
    setCityFilter: (state, action) => { state.cityFilter = action.payload; state.currentPage = 1; },
    setPage: (state, action) => { state.currentPage = action.payload; },
    setSelectedProperty: (state, action) => { state.selectedProperty = action.payload; },
    updatePropertyStatus: (state, action) => {
      const { id, status } = action.payload;
      const prop = state.list.find(p => p.id === id);
      if (prop) prop.status = status;
    },
  },
});

export const { setSearch, setTypeFilter, setStatusFilter, setCityFilter, setPage, setSelectedProperty, updatePropertyStatus } = productsSlice.actions;

export const selectFilteredProperties = (state) => {
  const { list, searchQuery, typeFilter, statusFilter, cityFilter } = state.products;
  return list.filter(p => {
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === 'All' || p.type === typeFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchCity = cityFilter === 'All' || p.city === cityFilter;
    return matchSearch && matchType && matchStatus && matchCity;
  });
};

export const selectPropertiesByUserId = (state, id) => {
  return state.products.list.filter(u => u.userId === id);
};

export const selectPropertyById = (state, id) => {
  return state.products.list.find(p => p.id === Number(id) || p.id === id);
};


export default productsSlice.reducer;
