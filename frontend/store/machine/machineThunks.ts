import { createAsyncThunk } from '@reduxjs/toolkit';
import { locationsApi } from '../mocks/mockRequests/locationsApi';
import { Machine } from './machineSlice';

export const fetchMachineById = createAsyncThunk<Machine, string>(
  'users/fetchMachineById',
  async (id: string) => {
    const response: { data: Machine } = await locationsApi.fetchMachine(id);
    return response.data;
  },
);
