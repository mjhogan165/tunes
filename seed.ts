import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { IFriendRequest } from "./src/providers/friends-provider";
interface IRequest {
  sender: string;
  reciever: string;
  id?: number;
  status?: string;
}
function generateUniqueNumberPair() {
  const numOne = faker.random
    .numeric(1, { allowLeadingZeros: true })
    .toString();
  let numTwo;
  do {
    numTwo = faker.random.numeric(1, { allowLeadingZeros: true }).toString();
  } while (numTwo === numOne);
  return [numOne, numTwo];
}

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
  const inputArray = [];
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

function generateUniqueNames(checkArray: IRequest[]) {
  let alreadySent = [];
  let numberPair = [];
  let sender = "";
  let reciever = "";
  let breakInfiniteLoop = 0;
  do {
    numberPair = generateUniqueNumberPair();
    sender = "user" + numberPair[0];
    reciever = "user" + numberPair[1];
    alreadySent = checkArray.filter(function (request) {
      if (sender == request.sender && reciever === request.reciever) {
        return true;
      } else return false;
    });
    breakInfiniteLoop++;
    if (breakInfiniteLoop > 5) {
      break;
    }
  } while (alreadySent.length > 0);

  return { sender: sender, reciever: reciever };
}

function generateFriendRequests() {
  const requestArray: IRequest[] = [];
  for (let i = 0; i < 50; i++) {
    let status = "";
    switch (true) {
      case i < 25:
        status = "accepted";
        break;
      case i < 30:
        status = "rejected";
        break;
      default:
        status = "pending";
        break;
    }

    const uniqueNames = generateUniqueNames(requestArray);

    const request = {
      status: status,
      sender: uniqueNames.sender,
      reciever: uniqueNames.reciever,
      id: i,
    };
    requestArray.push(request);
  }
  console.log({ requestArray: requestArray, lngth: requestArray.length });
  return requestArray;
}

const data = {
  accounts: generateAccounts(),
  tunes: generateTunes(),
  friendRequests: generateFriendRequests(),
};

writeFileSync("db.json", JSON.stringify(data));

// index.js
