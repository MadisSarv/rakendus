import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Machine } from '../machine/machineSlice';
import { RootState } from '../store';
import { fetchLocations } from './locationThunks';

export interface Floor {
  id: number;
  floorNr: number;
  machines: Machine[];
}
export interface Location {
  name: string;
  noOfFloors: number;
  noOfMachines: number;
  id: number;
  floors: Floor[];
  address?: string;
}

interface LocationSliceState {
  locations: Location[];
  locationsLoading: boolean;
  locationsError: boolean;
}

const initialState: LocationSliceState = {
  locations: [],
  locationsLoading: false,
  locationsError: false,
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.locationsError = false;
      state.locationsLoading = true;
    });
    builder.addCase(fetchLocations.rejected, (state) => {
      state.locationsError = true;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.locationsLoading = false;
    });
  },
});

export const { setLocations } = locationsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the stateSelectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter./// value)`
export const getLocations = (state: RootState) => state.locations;

const selectSelf = (state: RootState) => state;

export const locationsSelector = createSelector(
  selectSelf,
  (state: RootState) => state.locations.locations,
);

export const locationsLoadingSelector = createSelector(
  selectSelf,
  (state: RootState) => state.locations.locationsLoading,
);

export const machinesByFloorSelector = createSelector(
  (state, locationId, floorId) => {
    const locationById = state.locations.locations.find(
      (location: Location) => location.id === locationId,
    );

    return locationById.floors.find((floor: Floor) => floor.id === floorId);
  },
  (res?: Floor) => (res ? res.machines : []),
);

export default locationsSlice.reducer;
