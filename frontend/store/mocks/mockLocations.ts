import { Location } from '../locations/locationsSlice';
import { mockImage } from './mockImage';

export const mockLocations: Location[] = [
  {
    id: 1,
    noOfFloors: 2,
    noOfMachines: 6,
    address: 'Salu tee 29',
    name: 'Lohkva masinajaam',
    floors: [
      {
        id: 3,
        floorNr: 1,
        machines: [
          { id: 72277, name: 'Mingi höövel', floor: 1, image: mockImage },
          { id: 233, name: 'Teine höövel', floor: 1, image: mockImage },
          { id: 1244313, name: 'Kolmas höövel', floor: 1, image: mockImage },
          { id: 12223123, name: 'Neljas höövel', floor: 1, image: mockImage },
          { id: 4111221323, name: 'Viies höövel', floor: 1, image: mockImage },
          { id: 32433252, name: 'Kuues höövel', floor: 1, image: mockImage },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Maardu masinajaam',
    noOfFloors: 2,
    noOfMachines: 16,
    address: 'Ehitajate tee 123',
    floors: [
      {
        id: 0,
        floorNr: 1,
        machines: [
          { id: 777, name: 'Mingi höövel', floor: 1 },
          { id: 2, name: 'Teine höövel', floor: 1 },
          { id: 12313, name: 'Kolmas höövel', floor: 1 },
          { id: 123123, name: 'Neljas höövel', floor: 1 },
          { id: 41221323, name: 'Viies höövel', floor: 1 },
          { id: 324252, name: 'Kuues höövel', floor: 1 },
        ],
      },

      {
        id: 1,
        floorNr: 2,
        machines: [
          { id: 77237, name: 'Seitsmes höövel', floor: 2 },
          { id: 55234245, name: 'Kaheksas höövel', floor: 2 },
          { id: 7234377, name: 'Üheksas höövel', floor: 2 },
          { id: 55243243245, name: 'Kümnes höövel', floor: 2 },
          { id: 71234577, name: 'DKASDSA höövel', floor: 2 },
          { id: 5123155, name: 'Asdasda höövel', floor: 2 },
          { id: 7743242347, name: 'Akashan höövel', floor: 2 },
          { id: 12312, name: 'Poopoo höövel', floor: 2 },
          { id: 71312377, name: 'Kaka höövel', floor: 2 },
          { id: 512321355, name: 'Junn höövel', floor: 2 },
        ],
      },
    ],
  },
];
