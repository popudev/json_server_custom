const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.setLocale('vi');

const createUsers = (n) => {
  const users = [];
  Array.from(new Array(n)).forEach(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const user = {
      id: faker.datatype.uuid(),
      fullName: `${lastName} ${firstName}`,
      email: faker.internet.email(firstName, lastName, 'gmail.com'),
      age: faker.datatype.number({ min: 18, max: 60 }),
      phone: faker.phone.number('+84 ### ### ###'),
      admin: false,
    };

    users.push(user);
  });

  return users;
};

(() => {
  const users = createUsers(10);

  let db = {
    users,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully <3');
  });
})();
