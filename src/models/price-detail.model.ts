import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PriceDetail extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  order_id: string;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @property({
    type: 'number',
    default: 0,
  })
  discount_percentage?: number;

  @property({
    type: 'number',
    default: 0,
  })
  discount_amount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  shipping_discount_percentage?: number;

  @property({
    type: 'number',
    default: 0,
  })
  shipping_discount_amount?: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PriceDetail>) {
    super(data);
  }
}

export interface PriceDetailRelations {
  // describe navigational properties here
}

export type PriceDetailWithRelations = PriceDetail & PriceDetailRelations;
