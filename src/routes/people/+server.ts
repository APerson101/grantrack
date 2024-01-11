import type {ProfilePeople} from '$lib/utils';
import {json} from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET({url}){
const profile = url.searchParams.get('profile') as string;
console.log(`would later fetch the profile id: ${profile}`)
await new Promise(rs=>setTimeout(rs,2000));;
  const people:ProfilePeople={
    owner:"test owner",
    creator:"test creator",
    members: [...Array(4)].map((_,index)=>`member ${index}`)
  }
  return  json(people);
}
