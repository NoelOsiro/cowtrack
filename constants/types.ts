export interface Animal {
    id: string;
    name: string;
    breed: string;
    dob: string;
    rfid_tag: string;
    initialWeight: string;
    initialHealthStatus: string;
    gender: string;
    origin: string;
    purchaseDate: string;
    purpose: string;
    owner: string;
    species: string;
    age: string;
    count: string;
    userId: string; // ID of the user who owns this animal
  }
  export type EditableFields = Partial<Pick<Animal, 'origin' | 'purchaseDate' | 'purpose' | 'name' | 'rfid_tag' | 'breed' | 'initialHealthStatus' | 'dob' | 'initialWeight' | 'owner' | 'age'| 'count' | 'gender' |'species'>>;

  