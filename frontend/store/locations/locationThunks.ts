import { createAsyncThunk } from '@reduxjs/toolkit';
import { locationsApi } from '../mocks/mockRequests/locationsApi';
import { Location } from './locationsSlice';

export const fetchLocations = createAsyncThunk<Location[], void>(
  'users/fetchByIdStatus',
  async () => {
    const response: { data: Location[] } = await locationsApi.fetchLocations();
    return response.data;
  },
);
