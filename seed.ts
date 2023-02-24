import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

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
    inputArray.push({ userName: `user${i}`, password: `pw${i}`, id: i });
  }
  return inputArray;
}
function generateFriendRequests() {
  const inputArray = [];
  for (let i = 0; i < 10; i++) {
    let status = "";
    switch (true) {
      case i === 5:
        status = "accepted";
        break;
      case i === 1:
        status = "accepted";
        break;
      case i === 2:
        status = "rejected";
        break;

      default:
        status = "pending";
        break;
    }
    inputArray.push({
      status: status,
      sender: "user" + faker.random.numeric().toString(),
      reciever: "user" + faker.random.numeric().toString(),
      // sender: faker.random.numeric().toString(),
      // reciever: faker.random.numeric().toString(),
      id: i,
    });
  }
  return inputArray;
}

const data = {
  accounts: generateAccounts(),
  tunes: generateTunes(),
  friendRequests: generateFriendRequests(),
};

writeFileSync("db.json", JSON.stringify(data));

// index.js
