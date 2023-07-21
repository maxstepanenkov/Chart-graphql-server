import {connect, Schema, model, connection } from "mongoose";
import { faker } from '@faker-js/faker';

interface ISales {
  product: string;
  salesRevenue: number;
  region: string;
}

const SalesDataSchema = new Schema<ISales>({
  product: { type: String, required: true },
  salesRevenue: { type: Number, required: true },
  region: { type: String, required: true },
});

const Sales = model<ISales>('Sales', SalesDataSchema);
run().catch(err => console.log(err));

async function run() {
  await connect('mongodb+srv://saddam8285:n1ZLHwR3FR067Gn1@cluster0.0qfntxc.mongodb.net/');
  const sales = [];
  for (let i = 0; i < 100; i++) {
    sales.push({
      product: faker.commerce.productName(),
      salesRevenue: faker.number.float({ min: 50, max: 500 }),
      region: faker.location.country(),
    })
  }
  Sales.insertMany(sales)
    .then(() => {
      console.log('Data inserted seccessfully');
      connection.close();
    })
    .catch(err => {
      console.error(`Data insertion failed: ${err}`);
    })
};