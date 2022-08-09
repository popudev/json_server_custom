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
      createdAt: faker.date.between(),
      updatedAt: faker.date.between(),
    };

    users.push(user);
  });

  return users;
};

const createCategories = (n) => {
  const categories = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      createdAt: faker.date.between(),
      updatedAt: faker.date.between(),
    };

    categories.push(category);
  });
  return categories;
};

const createProducts = (categories, { min, max }) => {
  const products = [];

  categories.forEach((category) => {
    const n = faker.datatype.number({ min, max });
    Array.from(new Array(n)).forEach(() => {
      const price = Number.parseFloat(faker.commerce.price());
      const sale = Number.parseFloat(faker.commerce.price(0, price - 10));

      const product = {
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        categoryId: category.id,
        price: price,
        sale: sale,
        image: faker.image.fashion(870, 1305),
        createdAt: faker.date.between(),
        updatedAt: faker.date.between(),
      };

      products.push(product);
    });
  });
  return products;
};

(() => {
  const users = createUsers(10);
  const categories = createCategories(5);
  const products = createProducts(categories, { min: 5, max: 10 });
  let db = {
    users,
    categories,
    products,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully <3');
  });
})();
