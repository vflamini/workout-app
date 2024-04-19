import {ip} from '../config/ip';

export async function getAllRoutines() {
  //let wo
  const res = await fetch(ip + `/api/gettable/routine`);
  const data = await res.json();

  data.forEach(routine => {
    let id = routine.id;
    let name = routine.name;
    //const res = await fetch(ip + ``)
  })
}