import {writable} from 'svelte/store';
import type {ProfilePeople, ProfileType, Recipient} from './utils';
export const currentPage = writable(0);
export const profileInfo = writable < null |ProfileType>(null);
export const acceptedProfiles = writable < null |ProfileType []>(null);
export const profileId = writable<number>();
export const peopleProfile = writable<ProfilePeople | null >(null);
export const loadedProfiles = writable<null | ProfileType[]>(null);
export const recipients = writable<Recipient[]>();
