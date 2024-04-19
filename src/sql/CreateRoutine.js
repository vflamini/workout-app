import {ip} from '../config/ip';

export async function createRoutine(name, workouts) {
  const res = await fetch(ip + `/api/insert/routine/routine_name/${name}`, {method: 'POST'});
  const data = await res.json();
  const routineId = data.insertId;
  workouts.forEach(async workout => {
    let res = await fetch(ip + `/api/get/exercise/exercise_name/${workout.name}`)
    let data = await res.json();
    let workoutId;
    if (data.length === 0) {
      res = await fetch(ip + `/api/insertfull/exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exercise_name: workout.name,
          accessory: workout.accessory,
          accessory_weight: workout.accWeight,
          weighted: workout.weighted,
          timed: workout.timed
        })
      });
      data = await res.json();
      workoutId = data.insertId;
    } else {
      workoutId = data.id
    }
    res = await fetch(ip + `/api/insertfull/routine_exercise`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        routine_id: routineId,
        exercise_id: workoutId
      })
    })
  })
}