import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const db = new PrismaClient();

const userIds: string[] = [];
const items: any[] = [];

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    })
  ).then((response) => {
    response.forEach((user) => userIds.push(user.id));
  });

  await Promise.all(
    getItems().map((item: any) => {
      return db.item.create({ data: item });
    })
  ).then((response) => {
    response.forEach((item) => items.push(item));
  });

  await Promise.all(
    getItemPayOffs().map((itemPayOff: any) => {
      return db.itemPayoff.create({ data: itemPayOff });
    })
  );
}

seed();

function getUsers() {
  return [
    {
      id: "00000000-0000-0000-0000-000000000001",
      firstName: "Florian",
      lastName: "Serneels",
      email: "serneels.florian@outlook.com",
      phoneNumber: "+32474541834",
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      firstName: "Lennert",
      lastName: "Colman",
      email: "lennertcolman06@gmail.com",
      phoneNumber: "+32467890345",
    },
  ];
}

function getItems() {
  const items: any = [];

  userIds.map((id) => {
    for (let i = 0; i <= 3; i++) {
      items.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        isShared: faker.datatype.boolean(),
        isPayedOff: faker.datatype.boolean(),
        iconPath: "default",
        userId: id,
      });
    }
  });

  return items;
}

function getItemPayOffs() {
  const itemPayOffs: any = [];

  items.map((item) => {
    itemPayOffs.push({
      amount: calculateAmount(item.price),
      userId: item.userId,
      itemId: item.id,
    });
  });

  return itemPayOffs;
}

function calculateAmount(price: any): Number {
  const randomNumber = faker.datatype.number({
    min: 10,
    max: 80,
  });

  const amount: number = price - price * (randomNumber / 100);
  return amount;
}
