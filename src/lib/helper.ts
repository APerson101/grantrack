import {gql} from '@urql/core';

export const APIURL = 'https://alloscan.spec.dev/graphql'

// fetch grants :: akin to view profiles(?) :: Understood :: Done
// fetch pools ::Understood :: Done
// fetch strategies and query grants by strategy(?) ::Understood :: Done
// fetch accounts and view associated grants :: Understood :: Done
// fetch profile and view funds :: Understood ::Done
// create grant from scratch to finish
// 1: Create 10 accounts on testnet
// 2: Create 1 profile with 2 accounts each, add 2 members to each profile, assign one as pool manager each
// 3: use 1 accont to create another profile
// 4: add the other 2 as recepients


export const profileFragment = gql`fragment profileFragment on Profile
{
   profileId
    chainId
    name
    owner
    creator
    pools{
      profileId
      chainId
      poolId
      strategyName
      token
      amount
      feePaid
      strategy
      strategyId
      managerRoleId
      managerRole{
        roleAccounts{
          accountId
        }
      }
      adminRoleId
      adminRole{
        roleAccounts{
          accountId
        }
      }
       microGrant {
    microGrantRecipients {
      chainId
      recipientId
      requestedAmount
      recipientAddress
      sender
    }
  }
    }
    members:role{
      roleAccounts{
        roleId
        accountId
      }
    } 
}`

export const microInfo = gql`fragment microInfo on MicroGrant
{
  strategy
  strategyId
  allocationStartTime
  allocationEndTime
  approvalThreshold
  maxRequestedAmount
  gov
  minVotePower
  hats
  hatId
  microGrantRecipients{
    recipientId
    strategy
    poolId
    recipientAddress
    requestedAmount
    status,
    sender,
    chainId

  }
}`
export const sqfFragment = gql`fragment sqfFragment on SqfSuperFluid
{
    poolId
    registrationEndTime
    registrationStartTime
    allocationStartTime
    allocationEndTime
    chainId
    strategy
    strategyId
    receipients: sqfSuperFluidRecipients {
      recipientId
      recipientAddress
      totalUnits
      status
      sender
      
    }
}`

export const getPoolsPaginated = gql`
  query ($first:Int, $offset:Int) 
  {
   pools(first:$first, offset: $offset){
    poolId
    chainId
    profileId
    strategy
    strategyId
    strategyName
    token
    amount
    feePaid
    profile{
      profileId
      anchor
      name
    owner
    creator
    }
   microGrant {
    microGrantRecipients {
      chainId
      recipientId
      requestedAmount
      recipientAddress
      sender
    }
  }
  }
}
`
export const getProfilesPaginated = gql`
  query ($first:Int, $offset:Int) 
  {
   profiles(first:$first, offset: $offset){
    ...profileFragment
  }
}
${profileFragment}
`

export const getAllSqfSuperLiquids = gql`
query{
  sqfSuperFluids
  {
...sqfFragment
  }
}
${sqfFragment}
`
export const getSqfSuperLiquid = gql`
query($chainId:String!, $poolId:String!) {
  sqfSuperFluid(chainId:$chainId, poolId:$poolId)
  {
    ...sqfFragment
  }
}
${sqfFragment}
`

export const getPaginatedMicroGrants = gql`
query ($first:Int, $offset:Int, $chainId:String){
    microGrants(first:$first, offset:$offset, condition: {chainId:$chainId}){
    ...microInfo
    allocateds {
      recipientId
      contractName
      contractAddress
      status
      sender
    }
    distributeds {
      recipientId
      recipientAddress
      amount
      sender
      contractName
      contractAddress
    }
    recepients: microGrantRecipients {
      poolId
      recipientId
      recipientAddress
      requestedAmount
      status
      sender
    }
  }
}
${microInfo}
`

export const getUpcomingMicroGrants = gql`
query ($first:Int, $offset:Int) {
  upcomingMicroGrants(first:$first, offset: $offset, ) {
...microInfo
  }
}
${microInfo}
`
export const getActiveMicroGrants = gql`
query($first:Int, $offset:Int) {
  activeMicroGrants(first:$first, offset: $offset, ) {
...microInfo
  }
}
${microInfo}
`
export const getendedMicroGrants = gql`
query($first:Int, $offset: Int) {
  endedMicroGrants(first:$first, offset: $offset) {
...microInfo
  }
}
${microInfo}
`

export const getprofilesByOwner = gql`
 query($first:Int, $chainId:String, $owner:String) {
  profilesByOwner(first:$first, chainId:$chainId, owner:$owner)
  {
    ...profileFragment
  }
 }
  ${profileFragment}
`
export const getprofileQuery = gql`
 query($profileId:String!, $chainId:String!) {
  profile(profileId:$profileId, chainId:$chainId)
  {
    ...profileFragment
  }
 }
  ${profileFragment}
`

export const accountQuery = gql`
query($accountId:String) {
  roleAccounts(condition: {
    accountId:$accountId})
  {
    roleId
    chainId
    account{
       profiles {
    ...profileFragment  
    }
    }
    role {
      managerPools {
        poolId
        adminRoleId
        managerRoleId
      }
      
      adminPools {
        poolId
        adminRoleId
        managerRoleId
      }
    }
  }
}
${profileFragment}
`




// async function main(query: TypedDocumentNode<any, AnyVariables>, params: {}) {
//   const data = await client.query(query, params).toPromise()
//   console.log(data.data);
// }

// main(getprofilesByOwner, {
//   chainId: "5", first: 4, owner: "0x9b925641c5ef3fd86f63bff2da55a0deeafd1263"
// }).then(() => { }).catch((er) => console.log(er))