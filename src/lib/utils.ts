import {clsx, type ClassValue} from "clsx";
import {cubicOut} from "svelte/easing";
import type {TransitionConfig} from "svelte/transition";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};


export type SideNavItem = {
    title: string;
    path: string;
    index:number;
    icon:string;
};


export type ProfileType = {
    id:string
    name:string;
    type:string;
    amount: ProfileFundings;
    address:string;
    creator:string;
    startDate?:string;
    endDate?:string;
    creationDate?:string
    accountManagers:string[];
    acceptedProfiles:number;
    chains: string[];
    members:{
        roleId:string;
        accountId:string;
    }[]
};


export type ProjectType= {
    name:string;
    type:string;
    totalReceived:string;
    address:string;
    creator:string;
    grants:number;
    chains: string[];
};
export type ProfileFundings= {
    totalAmount:string;
    pools: PoolInfo[];
}

export type PoolInfo = {
    id:string;
    chain:string;
    amount:string;
    token:string;
    strategyName:string;
    strategyContract:string;
    feePaid:string;
    manager:string[];
    recepients: Recipient[];
}


export type Recipient=
{
    date: string;
    receiver: string;
    amount: string;
    sender: string;
    transactions: PoolTransaction[];
}

export type PoolTransaction = {
    date:string;
    receiver:string;
    sender:string;
    amount:string;
    token:string;
    type:string;
}




export type UserActivityAssociation = {
    name: string;
    roles: {chain: string; role: string}[];
    created: string;
    id: string;
}

export type ProfilePeople = {
    owner:string;
    creator:string;
    members: string[];
}

export interface IPool {
    profileId: string;
    chainId: string;
    poolId: string;
    token: string;
    amount: string;
    feePaid: string;
    strategyName: string;
    strategy: string;
    strategyId: string;
    managerRoleId: string;
    managerRole: {
        roleAccounts: {
            accountId: string;
        }[]
    }
    adminRoleId: string;
    adminRole: {
        roleAccounts: {
            accountId: string;
        }[]
    }
    microGrant: IReceiver;
    members: {
        roleAccounts:{
    roleId:string;
    accountId:string;
}[]
    }
}
export interface IProfile {
    profileId : string;
    chainId: string;
    name: string;
    owner :string;
    creator:string;
    pools: IPool[],
members:{
      roleAccounts:{
        roleId: string;
        accountId: string;
    }[]
}
}


export interface IMicroReceiver {
    chainId: string;
    recipientId: string;
    requestedAmount: string;
    recipientAddress: string;
    sender: string;
}

export interface IReceiver {
    allocationStartTime: number;
    allocationEndTime: number;
    microGrantRecipients: IMicroReceiver[];
}


export interface IRoleAccount
{
    roleId:string;
    chainId :string;
    account:{
       profiles:IProfile[]
    }
    role:{
        managerPools: poolController[];
        adminPools: poolController[]
    }
}


export interface poolController {
    poolId: string;
    adminRoleId: string;
    managerRoleId: string;   
}

export type AccountInfo = {
    address: string;
    chains: string[];
 profileAssociations: {name:string, profileId:string, chainId:string}[];
    fundingsSent: PoolTransaction[];
    fundingsReceived: PoolTransaction[];
    managerPools:string[];
    adminPools:string[]
}



export interface IMicroGrant {
    strategy: string;
    strategyId: string;
    allocationStartTime: string;
    allocationEndTime: string;
    approvalThreshold: string;
    maxRequestedAmount: string;
    gov: string;
    minVotePower: string;
    hats: string;
    hatId: string;
  microGrantRecipients:{
    recipientId: string;
    strategy: string;
    poolId: string;
    recipientAddress: string;
    requestedAmount: string;
    status: string;
        sender:string;
        chainId:string;

}[]   
}
export type MicroGrantType ={
    strategy: string;
    strategyId: string;
    allocationStartTime: string;
    allocationEndTime: string;
    approvalThreshold: string;
    maxRequestedAmount: string;
    gov: string;
    minVotePower: string;
    hats: string;
    hatId: string;
  microGrantRecipients:{
    recipientId: string;
    strategy: string;
    poolId: string;
    recipientAddress: string;
    requestedAmount: string;
    status: string;
        sender:string;
        chainId:string;

}[]   
}