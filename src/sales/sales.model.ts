import mongoose from 'mongoose';
import { ISales } from './sales.interface';

export const SalesSchema = new mongoose.Schema({
  product: { type: String, required: true },
  salesRevenue: { type: Number, required: true },
  region: { type: String, required: true },
}, { timestamps: true });

const Sales = mongoose.model<ISales & mongoose.Document>('sales', SalesSchema);

export default Sales;