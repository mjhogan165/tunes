import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
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
function isExsistingRequest(
  sender: string,
  reciever: string,
  list: IRequest[] | []
) {
  for (const request of list) {
    if (sender === request.reciever && reciever === request.sender) {
      console.log({
        type: "reverse",
        sender: sender,
        reciever: reciever,
        duplicate: request,
      });
      return true;
    } else if (sender === request.sender && reciever === request.reciever) {
      console.log({
        type: "exact match",
        sender: sender,
        reciever: reciever,
        duplicate: request,
      });
      return true;
    }
  }
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
function generateFriendRequests() {
  const requestList = [];
  for (let i = 0; i < 100; i++) {
    let status = "";
    switch (true) {
      case i < 50:
        status = "accepted";
        break;
      case i < 60:
        status = "rejected";
        break;
      default:
        status = "pending";
        break;
    }

    const numberPair = generateUniqueNumberPair();
    const sender = "user" + numberPair[0];
    const reciever = "user" + numberPair[1];
    const isDuplicate = isExsistingRequest(sender, reciever, requestList);
    if (!isDuplicate) {
      const request = {
        status: status,
        sender: sender,
        reciever: reciever,
        id: i,
      };
      requestList.push(request);
    } else {
      console.log({
        type: "OMITTED",
        status: status,
        sender: sender,
        reciever: reciever,
        id: i,
      });
    }
  }
  console.log(requestList);
  return requestList;
}

const data = {
  accounts: generateAccounts(),
  tunes: generateTunes(),
  friendRequests: generateFriendRequests(),
};

writeFileSync("db.json", JSON.stringify(data));

// index.js
