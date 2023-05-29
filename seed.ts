import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { IFriendRequest } from "./src/providers/friends-provider";
import { User } from "./src/Interfaces/forms";

function generateTunes() {
  const inputArray = [];
  for (let i = 0; i < 2; i++) {
    inputArray.push({
      artist: `${faker.name.firstName()} ${faker.music.genre()}`,
      title: faker.music.songName(),
      img: faker.image.abstract(100, 100, true),
      createdBy: "user" + faker.random.numeric(),
      comment: faker.lorem.lines(2),
      id: i,
    });
  }
  return inputArray;
}
function generateAccounts() {
  const inputArray: User[] = [];
  for (let i = 0; i < 10; i++) {
    inputArray.push({
      userName: `user${i}`,
      profileImg: faker.image.people(100, 100, true),
      password: `pw${i}`,
      id: i,
    });
  }
  return inputArray;
}

function generateRandomInt(limit: number) {
  return Math.floor(Math.random() * (limit - 0) + 0);
}

function generateRandomStatus(): "accepted" | "rejected" | "pending" {
  const num = generateRandomInt(3);
  switch (true) {
    case num === 0:
      return "accepted";
    case num === 1:
      return "rejected";
    case num === 2:
      return "pending";
    default:
      return "accepted";
  }
}

function generateUniqueId(omit: number) {
  let randomId: number = generateRandomInt(accounts.length);
  return randomId === omit ? (randomId += 1) : randomId;
}
function createRequest(config: IFriendRequest): {
  status: string;
  sender: string;
  receiver: string;
} {
  return {
    status: config.status,
    sender: config.sender,
    receiver: config.receiver,
  };
}

function generateUniqueReceiver(sender: User) {
  const receiverId = generateUniqueId(sender.id);
  const receiver = accounts.find((account) => account.id === receiverId);
  if (receiver) {
    return receiver;
  } else return sender;
}
const checkDuplicates = (
  requests: IFriendRequest[],
  sender: string,
  receiver: string
) => {
  return requests.find((request) => {
    const values = Object.values(request);
    console.log(values);
    const isDupe = values.includes(sender) && values.includes(receiver);
    if (isDupe) {
      console.log({ msg: "DUPE FOUND", dupe: request });
    }
    return isDupe;
  });
};
function generateFriendRequests(accounts: User[], requestsPerPerson: number) {
  const requestArray: IFriendRequest[] = [];
  for (const account of accounts) {
    const eligibleReceivers: User[] = [];
    for (let index = 0; index < requestsPerPerson; index++) {
      const receiver = generateUniqueReceiver(account);
      eligibleReceivers.push(receiver);
    }
    for (let index = 0; index < requestsPerPerson; index++) {
      const sender = account.userName;
      const receiver = eligibleReceivers[index].userName;
      const request = createRequest({
        status: generateRandomStatus(),
        sender: sender,
        receiver: receiver,
      }) as IFriendRequest;
      if (requestArray.length > 0) {
        console.log("IS > 0");
        if (!checkDuplicates(requestArray, sender, receiver)) {
          requestArray.push(request);
        }
      } else requestArray.push(request);
    }

    //************** */
    //you should go through this project and pass around the User object instead of the userName string that way you can easily get anything you want from it++++++ */
    //************** */
  }

  console.log(requestArray);
  console.log(requestArray.length);
  return requestArray;
}

const accounts = generateAccounts();
const friendRequests = generateFriendRequests(accounts, 5);
const data = {
  accounts: accounts,
  tunes: generateTunes(),
  friendRequests: friendRequests,
};

writeFileSync("db.json", JSON.stringify(data));

// index.js
