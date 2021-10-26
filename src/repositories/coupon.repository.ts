import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Coupon, CouponRelations} from '../models';

export class CouponRepository extends DefaultCrudRepository<
  Coupon,
  typeof Coupon.prototype.id,
  CouponRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Coupon, dataSource);
  }
}
