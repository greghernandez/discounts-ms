import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DiscountRequest extends Model {
  @property({
    type: 'string',
  })
  order_id?: string;

  @property({
    type: 'string',
  })
  coupon_code?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  payment_method: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  valid_zones: number[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DiscountRequest>) {
    super(data);
  }
}

export interface DiscountRequestRelations {
  // describe navigational properties here
}

export type DiscountRequestWithRelations = DiscountRequest & DiscountRequestRelations;
