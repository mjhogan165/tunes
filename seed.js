import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

///Javascript

function generateSongs() {
  const inputArray = [];
  for (let i = 0; i < 10; i++) {
    inputArray.push({
      artist: `${faker.name.firstName()} ${faker.music.genre()}`,
      title: faker.music.songName(),
      img: faker.image.abstract(100, 100, true),
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

const data = {
  accounts: generateAccounts(),
  songs: generateSongs(),
};

writeFileSync("db2.json", JSON.stringify(data));
