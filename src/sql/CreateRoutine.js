import {ip} from '../config/ip';

export async function createRoutine(name, workouts) {
  const res = await fetch(ip + `/api/insert/routines/routine_name/${name}`, {method: 'POST'});
  const data = await res.json();
  const routineId = data.insertId;
  workouts.forEach(async workout => {
    let res = await fetch(ip + `/api/get/workouts/workout_name/${workout}`)
    let data = await res.json();
    let workoutId;
    if (data.length === 0) {
      let res = await fetch(ip + `/api/insert/workouts/workout_name/${workout}`, {method: 'POST'})
      let data = await res.json();
      workoutId = data.insertId;
    } else {
      workoutId = data.workout_id;
    }
    res = await fetch(ip + `/api/insertfull/routine_workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({routine_id: routineId, workout_id: workoutId})
    })
    data = await res.json();
  })
}