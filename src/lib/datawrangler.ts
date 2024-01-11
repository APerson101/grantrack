import {Client} from '@urql/svelte';
import {accountQuery, getActiveMicroGrants, getUpcomingMicroGrants, getendedMicroGrants, getprofileQuery} from './helper';
import type {AccountInfo, IMicroGrant, IMicroReceiver, IPool, IProfile, IRoleAccount, MicroGrantType, PoolInfo, ProfileType} from './utils';



export  function filterResults(chainid: string, result: ProfileType[]): ProfileType[]
{
  return result.filter((e)=>e.chains.includes(chainid))
}

export function getChainColor(id:string):string
{
  switch (id) {
    case "1":
      return "bg-[#6b9080]";
    case "5":
      return 'bg-[#97a97c]';
    case "11155111":
      return "bg-[#f27059]";
      case  "8453":
      return "bg-[#b8bedd]";
        case "84531":
      return "bg-[#fad2e1]"; 
    case "10":
      return "bg-[#ce4257]"; 
      case "420":
      return "bg-[#a3cef1]";
    case "42220": return 'bg-[#f20089]'; 
    case '44787': return "bg-[#f6aa1c]"; 
    case "42161": return "bg-[#fb6f92]"; 
    case '421614': return 'bg-[#a01a58]';
    default :
      return 'bg-[#583101]'
  }

}
export function getChainMapping(id:string):string
{
  switch (id) {
    case "1":
      return "Mainnet";
    case "5":
      return 'Goerli';
    case "11155111":
      return "Sepolia";
      case  "8453":
        return "Base";
        case "84531":
      return "Base Goerli"; 
      case "10":
      return "Optimism"; 
      case "420":
      return "Optimism Goerli";
    case "42220": return 'Celo'; 
    case '44787': return "Celo Alfajores"; 
    case "42161": return "Arbitrum"; 
    case '421614': return 'Arbitrum Sepolia';
    default :
    return 'na'
  }

}

export const CHAINSCONSTANT =[
  "1",
"5",
"11155111",
"8453",
"84531",
"10",
"420",
"42220",
"44787",
"42161",
"421614",
]

export async function fetchProfileFromAllChains(client:Client, profileId:string):Promise<ProfileType | null>
{
  const profile: ProfileType = {
    id: profileId,
    name: '',
    type: 'grant',
    amount: {
      totalAmount: '',
      pools: []
    },
    address: '',
    creator: '',
    // TODO: QUERY FOR ACCOUNT MANAGERS ALSO
    accountManagers: ['sample', 'for','now', 'would'],
    //TODO: QUERY FOR RECEPIENTS
    acceptedProfiles: 0,
    chains: [],
    members:[]
  }
  const chainsActive:string[]=[];
  let totalAmount=0;
  const poolInfos: PoolInfo[]=[];
  const allReceivers: IMicroReceiver []=[];
  const accountManagersall: {
    accountId: string;
  }[]=[];
  for (const chain in CHAINSCONSTANT) {
    const result = await fetchProfile(client, profileId, CHAINSCONSTANT[chain]);
  console.log(result);
  if(result!=null)
  {
    profile.name=result.name;
    profile.address=result.profileId;
    profile.creator=result.creator;
    profile.members=[...result.members.roleAccounts]
    chainsActive.push(chain)
    const chainPools: IPool[]=result.pools
    for (const chainPool in chainPools)
    {
      const cp=chainPools[chainPool]
      if(cp.microGrant!=null)
      {allReceivers.push(...cp.microGrant.microGrantRecipients);}
      //TODO THERE IS A BIG BUG HERE WHERE THE AMOUNT TOTAL DOESNT TAKE INTO CONSIDERATION THE CURRENCY
      totalAmount+= Number.parseInt(cp.amount);
      accountManagersall.push(...cp.managerRole.roleAccounts)
      poolInfos.push(
        {
          id: cp.poolId,
          chain: CHAINSCONSTANT[chain],
          amount: cp.amount,
          token: cp.token,
          strategyName: cp.strategyName,
          strategyContract: cp.strategyId,
          feePaid: cp.feePaid,
          manager: [...Array(cp.managerRole.roleAccounts.length)].map((accountId) => accountId),
          recepients: []
        }
      )
    }

  }
}

  if (chainsActive.length==0)
  {
    return null;
  }
  const filteredReceievers = new Map < string, IMicroReceiver>();
  const filteredManagers = new Map<string, {accountId:string}>();

for (let index = 0; index < allReceivers.length; index++) {
  const reciever = allReceivers[index];
  if (!filteredReceievers.has(reciever.recipientAddress))
  {
    filteredReceievers.set(reciever.recipientAddress, reciever);
  }
  
}


for (let index = 0; index < accountManagersall.length; index++) {
  const accountManager = accountManagersall[index];
  if(!filteredManagers.has(accountManager.accountId))
  {
    filteredManagers.set(accountManager.accountId, accountManager);
  }
}

profile.chains = chainsActive;
profile.amount.totalAmount=totalAmount.toString();
profile.amount.pools=poolInfos;
  profile.acceptedProfiles = filteredReceievers.size > 0 ? filteredReceievers.size :0;
profile.accountManagers=[...filteredManagers.keys()];
return profile;
}

async function fetchProfile(client:Client, id:string, chain:string):Promise<null|IProfile>
{
  // const client= getContextClient();
  const data=await client.query(getprofileQuery, {
    chainId: chain,
    profileId: id
  }).toPromise()
  return data.data.profile==null?null: data.data.profile as IProfile;

}

export async function fetchUpComingGrants (client:Client) : Promise<MicroGrantType[]>
{

const data=await client.query(getUpcomingMicroGrants, {
  first:20, offest:0
}).toPromise()

if(data.data.upcomingMicroGrants.length==0)
{return []}

else {
  const grants:MicroGrantType[]=[];
  for (let index = 0; index < data.data.length; index++) {
    const grant:IMicroGrant = data.data[index];
    grants.push((grant as IMicroGrant))
  }
  return grants;
}
}
export async function fetchactiveGrants(client: Client): Promise<MicroGrantType[]>
{

const data=await client.query(getActiveMicroGrants, {
  first:20, offest:0
}).toPromise()

if(data.data.activeMicroGrants.length==0)
{return []}

else {
  const grants:MicroGrantType[]=[];
  for (let index = 0; index < data.data.length; index++) {
    const grant:IMicroGrant = data.data[index];
    grants.push((grant as IMicroGrant))
  }
  return grants;
}
}
export async function fetchEndedGrants(client: Client): Promise<MicroGrantType[]>
{

const data=await client.query(getendedMicroGrants, {
  first:20, offest:0
}).toPromise()

if(data.data.endedMicroGrants.length==0)
{return []}

else {
  const grants:MicroGrantType[]=[];
  for (let index = 0; index < data.data.length; index++) {
    const grant:IMicroGrant = data.data[index];
    grants.push((grant as IMicroGrant))
  }
  return grants;
}
}

export async function recursiveAccountRetreival(client:Client, accountId:string)
{
    const accountql=await client.query(accountQuery, {
      accountId
    }).toPromise();
    if(accountql.data.roleAccounts.length==0)
    {
      return null;
    }
    const accountAssociations:IRoleAccount[]=[];
    for (let index = 0; index < accountql.data.roleAccounts.length; index++) {
      const element = accountql.data.roleAccounts[index];
      const fixed=element as IRoleAccount;
      accountAssociations.push(fixed);
    }
  const all: AccountInfo []=[];
  for (const acc in accountAssociations) {
    const account = accountAssociations[acc];

      const mappedAccount: AccountInfo= {
        address: accountId,
        profileAssociations:[...account.account.profiles.map((e)=>({
          name: e.name,
          profileId: e.profileId,
          chainId: e.chainId
        }))],
        fundingsSent: [],
        fundingsReceived: [],
        managerPools: account.role.managerPools.map((e) => e.poolId),
        adminPools: account.role.adminPools.map((e) => e.poolId),
        chains: []
      }
      all.push(mappedAccount);
  }
  const chains:string[]=[]
for (const profile in all) {
    const element = all[profile];
    chains.push(...element.profileAssociations.map((e)=>e.chainId))
  }


  all[0].chains=[...new Set(chains)]
  for (const mp in all) {
    all[mp].chains = [...new Set(chains)];
    }
const mpools:string[]=[];
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      mpools.push(...element.managerPools)
    }
    all[0].managerPools=[...new Set(mpools)];
const apools:string[]=[];
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      mpools.push(...element.adminPools)
    }
    all[0].adminPools=[...new Set(apools)];
  return all;
}




export const fakeData: ProfileType[] = [...Array(10)].map(() => ({
  id: "testasdfklas89jkh",
  name: "235dskjgkasjhdkjha",
  type: "grant",
  amount: {
    totalAmount: '5000',
    pools: [...Array(4)].map(() => ({
      id: '4',
      chain: '4',
      amount: '600',
      token: 'BTS',
      strategyName: 'Simple Sample Contract',
      strategyContract: 'ox893453489',
      feePaid: '40',
      manager: ['0x78345jk78934'],
      recepients: [...Array(3)].map(() => ({
        date: '22/12/22',
        receiver: 'ox3495349',
        amount: '12',
        sender: '0xdsfa89',
        transactions: [...Array(10)].map(() => ({
          date: '22/12/22',
          receiver: 'ox3495349',
          amount: '12',
          sender: '0xdsfa89',
          token: 'ARB',
          type: 'C/D'
        }))
      }))
    }))
  },
  address: "0x454kj89234kj23",
  creator: "0xi347y5io4jkhlds",
  startDate: '22/2/12',
  endDate: "11/11/11",
  creationDate: '11/11/11',
  accountManagers: ['0x32445834756', '0zi4632dsf', '0x347853jhg'],
  acceptedProfiles: 7,
  chains: ["Sepolia Arbium", "Arbium", "Mainnet"],
  members: [
    {
      accountId: "0xjk5354sdf",
      roleId: "0x3245237"
    },
    {
      accountId: "0xjk5354sdf",
      roleId: "0x3245237"
    },
    {
      accountId: "0xjk5354sdf",
      roleId: "0x3245237"
    },
    {
      accountId: "0xjk5354sdf",
      roleId: "0x3245237"
    },
    {
      accountId: "0xjk5354sdf",
      roleId: "0x3245237"
    },
  ]
}));