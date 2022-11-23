import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  rocketDetails: [],
};

const rocketDetailsSlice = createSlice({
  name: 'rocketDetails',
  initialState,
  reducers: {
    getRocketDetails: (state) => {
      state.loading = true;
    },
    getRocketDetailsSuccess: (state, { payload }) => {
      state.rocketDetails = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getRocketDetailsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getRocketDetails,
  getRocketDetailsSuccess,
  getRocketDetailsFailure,
} = rocketDetailsSlice.actions;
export const rocketDetailsSelector = (state) => state.rocketDetails;
export default rocketDetailsSlice.reducer;

export function fetchRocketDetails(url) {
  return async (dispatch) => {
    dispatch(getRocketDetails());

    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch(getRocketDetailsSuccess(data));
    } catch (error) {
      dispatch(getRocketDetailsFailure());
    }
  };
}
