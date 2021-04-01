import { DataType } from '../enums/data-type.enum';

export interface IBookItem {
  price: string;
  quantity: string;
  total: string;
  type: DataType;
}
