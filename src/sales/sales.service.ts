import SalesModel from './sales.model';
import ISales from "./sales.interface";

class SalesService {
  public async getAll(): Promise<ISales[]> {
    const sales = await SalesModel.find().lean();
    return sales;
  }

  public async getByName(name: string): Promise<ISales | null> {
    const sale = await SalesModel.findOne({ product: name });
    return sale;
  }

  public async getHighest(quantity: number): Promise<ISales[]> {
    const sales = await SalesModel.find().sort({ salesRevenue: -1 }).limit(quantity);
    return sales;
  } 

  public async update(product: string, data: number): Promise<ISales | null> {
    const updatedSales = await SalesModel.findOneAndUpdate({ product }, { salesRevenue: data }, { new: true });
    return updatedSales;
  }

  public async remove(product: string): Promise<ISales | null> {
    const deletedSales = await SalesModel.findOneAndDelete({ product }, { new: true });
    return deletedSales;
  }
}

export default new SalesService();