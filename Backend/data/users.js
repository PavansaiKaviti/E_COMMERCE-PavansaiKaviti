const bcrypt = require("bcrypt");
const users = [
  {
    name: "Dino",
    email: "dino@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Dino1",
    email: "dino1@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
  {
    name: "Dino2",
    email: "dino2@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];

module.exports = users;
