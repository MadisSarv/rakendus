import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Machine {
  name: string;
  id: number;
}

export interface Location {
  name: string;
  id: number;
  machines: Machine[];
}

const initialState = {
  locations: [
    {
      id: 1,
      name: 'Lohkva masinajaam',
      machines: [{ id: 123, name: 'Raskeveomasin' }],
    },

    {
      id: 2,
      name: 'Maardu masinajaam',
      machines: [
        { id: 777, name: 'Mingi höövel' },
        { id: 555, name: 'Teine höövel' },
      ],
    },
  ],
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

export const machineSelector = createSelector(
  (state: RootState, machineId?: number) => {
    if (!machineId) {
      return undefined;
    }
    const machines = state.locations.locations.flatMap(
      (location) => location.machines,
    );

    return machines.find((machine) => machine.id === machineId);
  },
  (res) => res,
);
export default locationsSlice.reducer;
