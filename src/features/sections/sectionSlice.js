import { createSlice } from '@reduxjs/toolkit';

const initialSections = [
    {
        id: 1,
        title: 'Featured Properties',
        subtitle: 'Handpicked premium listings across top cities',
        propertyListing: [1, 2],   // property IDs from propertiesData
        status: 'Active',
        createdAt: '2026-01-10',
    },
    {
        id: 2,
        title: 'New Launches',
        subtitle: 'Freshly listed properties hitting the market',
        propertyListing: [3, 5],
        status: 'Active',
        createdAt: '2026-02-03',
    },
    {
        id: 3,
        title: 'Budget Homes',
        subtitle: 'Affordable options under ₹50 Lakhs',
        propertyListing: [4],
        status: 'Inactive',
        createdAt: '2026-02-18',
    },
    {
        id: 4,
        title: 'Luxury Segment',
        subtitle: 'Elite properties redefining modern living',
        propertyListing: [1, 6],
        status: 'Active',
        createdAt: '2026-03-01',
    },
];

const sectionSlice = createSlice({
    name: 'sections',
    initialState: {
        sections: initialSections,
        statusFilter: 'All',
    },
    reducers: {
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        addSection: (state, action) => {
            const newId = Math.max(...state.sections.map(s => s.id), 0) + 1;
            state.sections.push({
                id: newId,
                createdAt: new Date().toISOString().split('T')[0],
                ...action.payload,
            });
        },
        updateSection: (state, action) => {
            const index = state.sections.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.sections[index] = action.payload;
            }
        },
        deleteSection: (state, action) => {
            state.sections = state.sections.filter(s => s.id !== action.payload);
        },
        toggleSectionStatus: (state, action) => {
            const section = state.sections.find(s => s.id === action.payload);
            if (section) {
                section.status = section.status === 'Active' ? 'Inactive' : 'Active';
            }
        },
    },
});

export const {
    setStatusFilter,
    addSection,
    updateSection,
    deleteSection,
    toggleSectionStatus,
} = sectionSlice.actions;

export const selectFilteredSections = (state) => {
    const { sections, statusFilter } = state.sections;
    if (statusFilter === 'All') return sections;
    return sections.filter(s => s.status === statusFilter);
};

export default sectionSlice.reducer;
