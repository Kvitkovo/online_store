import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockCategories as mockData } from '../../data/catalog/contact';
import { GetCategories } from '../../services/catalog/categoryAccess.service';

const initialState = {
  loaded: false,
  hasError: false,
  menuItems: [],
  initialMenu: [],
  prevParents: [],
};

export const fetchCategories = createAsyncThunk(
  'menu/fetchCategories',
  async () => {
    const response = await GetCategories();

    return response;
  },
);
const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    goToSubMenu(state, action) {
      state.menuItems = action.payload.data;
      state.prevParents.push(action.payload.id);
    },
    goBack(state, action) {
      const { prevParents } = state;

      if (prevParents.length === 0) {
        action.payload.backFunc();
      } else {
        const parentsId = prevParents.pop();
        const prevMenu =
          state.initialMenu.find((category) => category.id === parentsId) || {};
        if (prevMenu.parent) {
          const newMenu = state.initialMenu.find(
            (category) => category.id === prevMenu.parent.id,
          );
          state.menuItems = newMenu.children;
        } else {
          state.menuItems = state.initialMenu;
          state.prevParents = [];
        }
      }
    },
    closeMenu(state) {
      state.menuItems = state.initialMenu;
      state.prevParents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const promotionalPrice = {
          id: 0,
          name: 'Акційна ціна',
          alias: 'Sale',
          parent: null,
          metaDescription: '',
          metaKeywords: '',
          description: '',
          status: 'ACTIVE',
          icon: 'SALE',
          hasSubCategory: false,
          sortValue: 0,
        };
        const formatCategory = (category, index, categories) => {
          const mainPath = `/categories`;
          const icon = category.icon;
          const bg = mockData[index]?.bg;
          const path =
            category.name === 'Акційна ціна'
              ? `${mainPath}/discounted`
              : `${mainPath}/${category.id}`;
          const children = categories
            .filter((child) => {
              return child.parent?.id === category.id;
            })
            .map((child) => ({
              ...child,

              link: `${mainPath}/${child.id}`,
            }));
          return { ...category, children, bg, icon, link: path };
        };
        const mainCategories = [
          promotionalPrice,
          ...action.payload.filter((category) => !category.parent),
        ];
        const formattedCategories = mainCategories.map((item, idx) =>
          formatCategory(item, idx, action.payload),
        );

        state.loaded = true;
        state.hasError = false;
        state.menuItems = [...formattedCategories];
        state.initialMenu = [...formattedCategories];
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { goToSubMenu, goBack, closeMenu } = catalogSlice.actions;

export const catalogSliceReducer = catalogSlice.reducer;
