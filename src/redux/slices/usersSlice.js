import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersData } from '../../data/mockData';


import { API_URL } from '../../service/api';

const USERS_URL = `${API_URL}/users`;



// ── Plan Thunks ──
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(USERS_URL);
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json; // Return the whole object to get pagination and count
  } catch (e) { return rejectWithValue(e.message); }
});



const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    pagination: null,
    totalUsers: 0,
    searchQuery: '',
    roleFilter: 'All',
    statusFilter: 'All',
    currentPage: 1,
    pageSize: 8,
    selectedUser: null,
  },
  reducers: {
    setSearch: (state, action) => { state.searchQuery = action.payload; state.currentPage = 1; },
    setRoleFilter: (state, action) => { state.roleFilter = action.payload; state.currentPage = 1; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; state.currentPage = 1; },
    setPage: (state, action) => { state.currentPage = action.payload; },
    setSelectedUser: (state, action) => { state.selectedUser = action.payload; },

    updateUserStatus: (state, action) => {
      const { id, status } = action.payload;
      const user = state.list.find(u => (u._id || u.id) === id);
      if (user) user.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
        state.totalUsers = action.payload.count || 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearch, setRoleFilter, setStatusFilter, setPage, setSelectedUser, updateUserStatus } = usersSlice.actions;

export const selectFilteredUsers = (state) => {
  const { list, searchQuery, roleFilter, statusFilter } = state.users;
  return list.filter(u => {
    const matchSearch = !searchQuery ||
      (u.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.city?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    // API uses 'type', UI might use 'role'
    const userRole = u.type || u.role || 'All';
    const matchRole = roleFilter === 'All' || userRole.toLowerCase() === roleFilter.toLowerCase();
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });
};

export const selectUserById = (state, id) => {
  return state.users.list.find(u => (u._id || u.id) === id);
};

export default usersSlice.reducer;
