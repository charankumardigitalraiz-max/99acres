import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../service/api";

const CATEGORY_API_URL = `${API_URL}/categories`;

// Async Thunks
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(CATEGORY_API_URL);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch");
            // Returning both categories data and the counts from the API
            return {
                categories: data.data,
                counts: data.count
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(CATEGORY_API_URL, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to add");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
                method: "PUT",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete");
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const CategorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        counts: {
            total: 0,
            active: 0,
            inactive: 0
        },
        statusFilter: 'All',
        loading: false,
        error: null,
    },
    reducers: {
        setStatusFilter: (state, action) => { state.statusFilter = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.counts = action.payload.counts;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add
            .addCase(addCategory.pending, (state) => { state.loading = true; })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.unshift(action.payload);
                state.counts.total += 1;
                if (action.payload.isActive) state.counts.active += 1;
                else state.counts.inactive += 1;
            })
            .addCase(addCategory.rejected, (state) => { state.loading = false; })
            // Update
            .addCase(updateCategory.pending, (state) => { state.loading = true; })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    const oldStatus = state.categories[index].isActive;
                    const newStatus = action.payload.isActive;

                    if (oldStatus !== newStatus) {
                        if (newStatus) {
                            state.counts.active += 1;
                            state.counts.inactive -= 1;
                        } else {
                            state.counts.active -= 1;
                            state.counts.inactive += 1;
                        }
                    }
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state) => { state.loading = false; })
            // Delete
            .addCase(deleteCategory.pending, (state) => { state.loading = true; })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                const category = state.categories.find(c => c._id === action.payload);
                if (category) {
                    if (category.isActive) state.counts.active -= 1;
                    else state.counts.inactive -= 1;
                    state.counts.total -= 1;
                }
                state.categories = state.categories.filter(c => c._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state) => { state.loading = false; });
    }
});

export const { setStatusFilter } = CategorySlice.actions;

export const selectFilteredCategories = (state) => {
    const { statusFilter, categories } = state.categories;
    if (statusFilter === 'All') return categories;
    const isActive = statusFilter === 'Active';
    return categories.filter(c => c.isActive === isActive);
};

export default CategorySlice.reducer;
