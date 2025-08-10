import { Location } from '../../locations/locationsSlice';
import { Machine } from '../../machine/machineSlice';
import { mockMachine } from '../machineMock';
import { mockLocations } from '../mockLocations';

export const locationsApi = {
  fetchLocations: async (): Promise<{ data: Location[] }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: mockLocations });
      }, 1000);
    });
  },
  fetchMachine: async (id: string): Promise<{ data: Machine }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: mockMachine });
      }, 1000);
    });
  },
};
