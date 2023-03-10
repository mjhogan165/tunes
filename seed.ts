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
  const inputArray = [];
  for (let i = 0; i < 10; i++) {
    let status = "";
    // if (i % 2 === 0) {
    //   status = "accepted";
    // } else if (i === 5 || i === 9) {
    //   status = "rejected";
    // } else status = "pending";
    switch (true) {
      case i === 0 || i === 1:
        status = "accepted";

        break;
      case i === 2 || i === 3:
        status = "rejected";
        break;
      case i === 4 || i === 5:
        status = "pending";
        break;

      default:
        status = "pending";
        break;
    }

    inputArray.push({
      status: status,
      //  sender: "user1",
      sender: "user" + i,
      // reciever: "user" + faker.random.numeric().toString(),
      reciever: "user" + (i + 1),
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
