import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchMachineById } from './machineThunks';

export interface Comment {
  date: Date;
  createdBy: string;
}

export interface Maintenance {
  dateCreated: Date;
  createdBy: string;
  doneBy: string;
  dateDone: Date;
  description: string;
  comments: Comment[];
}

export interface Machine {
  name: string;
  floor: number;
  id: number;
  image?: string;
  address?: string;
  maintenances?: Maintenance[];
}

export interface Floor {
  id: number;
  floorNr: number;
  machines: Machine[];
}

export interface MachineState {
  currentMachine?: Machine;
  machineLoading: boolean;
  machineError: boolean;
}

const initialState: MachineState = {
  currentMachine: undefined,
  machineLoading: false,
  machineError: false,
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMachine: (state, action) => {
      state.currentMachine = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMachineById.pending, (state) => {
      state.machineError = false;
      state.machineLoading = true;
    });
    builder.addCase(fetchMachineById.rejected, (state) => {
      state.machineError = true;
    });
    builder.addCase(fetchMachineById.fulfilled, (state, action) => {
      state.machineLoading = false;
      state.currentMachine = action.payload;
    });
  },
});

export const { setMachine } = machineSlice.actions;

// The function below is called a selector and allows us to select a value from
// the stateSelectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter./// value)`

export const machineSelector = createSelector(
  (state: RootState) => {
    return state.machine.currentMachine;
  },
  (res) => res,
);

export const machineLoadingSelector = createSelector(
  (state: RootState) => {
    return state.machine.machineLoading;
  },
  (res) => res,
);

export default machineSlice.reducer;
