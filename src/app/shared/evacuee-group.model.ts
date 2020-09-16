import { Address } from "./address.model";
import { Evacuee } from './evacuee.model';
import { Shelter } from './shelter.model';

export interface EvacueeGroup {
    shelterId: number;
    address: Address;
    evacuees: Evacuee[];
}