import { writable } from 'svelte/store';
import {createRoutine} from '../sql/CreateRoutine';
import { getAllRoutines } from '../sql/GetAllRoutines';

export const workoutRoutines = writable([]);

export const addWorkoutRoutine = (workoutName, properties) => {
  createRoutine(workoutName, properties);
  workoutRoutines.update((obj) => {
    return {...obj,[workoutName]: properties};
  })
}

export const removeWorkoutRoutine = (workoutName) => {
  workoutRoutines.update((obj) => {
    // Create a copy of the object without the specified property
    const newObj = { ...obj };
    delete newObj[workoutName];
    return newObj;
  });
};

export const updateProperty = (workoutName, property, newValue) => {
  workoutRoutines.update((obj) => {
    const newObj = {...obj};
    newObj[workoutName][property] = newValue;
    return newObj;
  });
};

export const initWorkoutRoutines = async () => {
  await getAllRoutines();
}