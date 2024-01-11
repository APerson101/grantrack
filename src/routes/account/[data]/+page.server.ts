// import type {AccountInfo} from "$lib/utils";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  return {accountId:params.data};
}
//   const acc:AccountInfo={
//     address: "sample addd",
//     chains: ["a", "b",  "c"],
//     dateCreated: "now now",
//     projectsAssociations: [
//       ...Array(4)
//     ].map(()=>({
// name:"test",
// roles: [
// {chain:"a", role:"manager"},
// {chain:"b", role:"manager"},
// {chain:"c", role:"manager"},
// {chain:"d", role:"manager"},
// ],
// created:"now now",
// id:"testing"
//     })),
//     grantsAssociations: [
//       ...Array(4)
//     ].map(() => ({
//       name: "test",
//       roles: [
//         {chain: "a", role: "manager"},
//         {chain: "b", role: "manager"},
//         {chain: "c", role: "manager"},
//         {chain: "d", role: "manager"},
//       ],
//       created: "now now",
//       id: "testing"
//     })),
//     fundingsReceived: [...Array(4)].map(()=>({
//       date: "now now",
//       receiver: "me",
//       sender:"them",
//       amount: "a lot",
//       token:"ARB",
//       type: "credit"
//     })),
//     fundingsSent: [...Array(4)].map(() => ({
//       date: "now now",
//       receiver: "me",
//       sender: "them",
//       amount: "a lot",
//       token: "ARB",
//       type: "debit"
//     })),
//   }

//   await new Promise(rs => setTimeout(rs, 2000));
// return {
//   accountInfo: acc
// }