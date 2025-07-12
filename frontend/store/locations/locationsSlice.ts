import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Machine {
  name: string;
  floor: number;
  id: number;
}

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

const initialState = {
  locations: [
    {
      id: 1,
      nrOfFloors: 2,
      noOfMachines: 6,
      address: 'Salu tee 29',
      name: 'Lohkva masinajaam',
      floors: [
        {
          id: 3,
          floorNr: 1,
          machines: [
            { id: 72277, name: 'Mingi höövel' },
            { id: 233, name: 'Teine höövel' },
            { id: 1244313, name: 'Kolmas höövel' },
            { id: 12223123, name: 'Neljas höövel' },
            { id: 4111221323, name: 'Viies höövel', floor: 0 },
            { id: 32433252, name: 'Kuues höövel' },
          ],
        },
      ],
    },

    {
      id: 2,
      name: 'Maardu masinajaam',
      nrOfFloors: 2,
      noOfMachines: 16,
      address: 'Ehitajate tee 123',
      floors: [
        {
          id: 0,
          floorNr: 1,
          machines: [
            { id: 777, name: 'Mingi höövel', floor: 0 },
            { id: 2, name: 'Teine höövel', floor: 1 },
            { id: 12313, name: 'Kolmas höövel', floor: 0 },
            { id: 123123, name: 'Neljas höövel', floor: 1 },
            { id: 41221323, name: 'Viies höövel', floor: 0 },
            { id: 324252, name: 'Kuues höövel', floor: 1 },
          ],
        },

        {
          id: 1,
          floorNr: 2,
          machines: [
            { id: 77237, name: 'Seitsmes höövel', floor: 0 },
            { id: 55234245, name: 'Kaheksas höövel', floor: 1 },
            { id: 7234377, name: 'Üheksas höövel', floor: 0 },
            { id: 55243243245, name: 'Kümnes höövel', floor: 1 },
            { id: 71234577, name: 'DKASDSA höövel', floor: 0 },
            { id: 5123155, name: 'Asdasda höövel', floor: 1 },
            { id: 7743242347, name: 'Akashan höövel', floor: 0 },
            { id: 12312, name: 'Poopoo höövel', floor: 1 },
            { id: 71312377, name: 'Kaka höövel', floor: 0 },
            { id: 512321355, name: 'Junn höövel', floor: 1 },
          ],
        },
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

export const machinesByFloorSelector = createSelector(
  (state, locationId, floorId) => {
    const locationById = state.locations.locations.find(
      (location: Location) => location.id === locationId,
    );

    return locationById.floors.find((floor: Floor) => floor.id === floorId);
  },
  (res?: Floor) => (res ? res.machines : []),
);

export const machineSelector = createSelector(
  (state: RootState, machineId?: number) => {
    if (!machineId) {
      return undefined;
    }

    const floors = state.locations.locations.flatMap(
      (location) => location.floors,
    );
    const machines = floors.flatMap((floor) => floor.machines);

    return machines.find((machine) => machine.id === machineId);
  },
  (res) => res,
);
export default locationsSlice.reducer;
