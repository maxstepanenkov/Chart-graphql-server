import ISales from "../sales/sales.interface";
import SalesService from "../sales/sales.service";

export const resolvers = {
  Query: {
    sales: async () => {
      try {
        return await SalesService.getAll();
      } catch (e) {
        console.log(e);
      }
    },
    salesByName: async (arg=null, { product }: any) => {
      try {
        return await SalesService.getByName(product);
      } catch(e) {
        console.log(e);
      }
    },
    sortedSales: async (arg=null, { quantity }: any) => {
      try {
        return await SalesService.getHighest(quantity);
      } catch (e) {
        console.log(e)
      }
    }
  },
  Mutation: {
    updateSales: async (product: string, salesRevenue: number) => {
      try {
        return await SalesService.update(product, salesRevenue);
      } catch (e) {
        console.log(e);
      }
    },
    deleteSales: async (product: string) => {
      try {
        return await SalesService.remove(product);
      } catch (e) {
        console.log(e);
      }
    }
  }
};