import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Coupon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  coupon_code?: string;

  @property({
    type: 'number',
    default: 0,
  })
  discount_percentage?: number;

  @property({
    type: 'number',
    default: 0,
  })
  min_amount?: number;

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

  @property({
    type: 'date',
    required: true,
  })
  due_date: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  type?: string;

  @property({
    type: 'number',
    required: true,
  })
  usage_limit_per_user: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Coupon>) {
    super(data);
  }
}

export interface CouponRelations {
  // describe navigational properties here
}

export type CouponWithRelations = Coupon & CouponRelations;
