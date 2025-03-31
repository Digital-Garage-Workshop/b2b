import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Car {
  id: string; 
  carid: string;
  manuName: string;
  modelName: string;
  engine: string;
  plate: string | null;
  vin: string | null;
}

interface CarsState {
  cars: Car[];
  selectedCarId: string | null; 
}

const initialState: CarsState = {
  cars: [],
  selectedCarId: null
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<Car, 'id'>>) => {
      const carExists = state.cars.some(car => car.carid === action.payload.carid);
      
      if (!carExists) {
        const newId = Date.now().toString(); 
        state.cars.push({
          id: newId,
          ...action.payload
        });
        state.selectedCarId = newId;
      } else {
        const existingCar = state.cars.find(car => car.carid === action.payload.carid);
        if (existingCar) {
          state.selectedCarId = existingCar.id;
        }
      }
    },
    
    updateCar: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
    },
    
    removeCar: (state, action: PayloadAction<string>) => {
      const isRemovingSelected = state.selectedCarId === action.payload;
     
      
      
      state.cars = state.cars.filter(car =>  car.carid !== action.payload);
      
      // if (isRemovingSelected) {
      //   state.selectedCarId = state.cars.length > 0 ? state.cars[0].id : null;
      // }
    },
    
    selectCar: (state, action: PayloadAction<string | null>) => {
      state.selectedCarId = action.payload;
    },
    
    clearCars: (state) => {
      state.cars = [];
      state.selectedCarId = null;
    }
  },
});

export const { addCar, updateCar, removeCar, selectCar, clearCars } = carsSlice.actions;

export const selectAllCars = (state: { cars: CarsState }) => state.cars.cars;
export const selectSelectedCar = (state: { cars: CarsState }) => {
  const { cars, selectedCarId } = state.cars;
  return cars.find(car => car.id === selectedCarId) || null;
};

export default carsSlice.reducer;