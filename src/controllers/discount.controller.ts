
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, requestBody, response} from '@loopback/rest';
import {PriceDetail} from '../models';
import {DiscountRequest} from '../models/discount-request.model';
import {CouponRepository} from '../repositories';


export class DiscountController {
  constructor(
    @repository(CouponRepository)
    public couponRepository: CouponRepository,
  ) { }

  /**
   * Get discount
   */
  @get('/discount/')
  @response(200, {
    description: 'Array of Coupon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DiscountRequest, {includeRelations: true}),
        },
      },
    }
  })
  async getDiscount(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRequest, {partial: true}),
        },
      },
    })
    disountRequest: DiscountRequest,
  ): Promise<PriceDetail> {
    const coupon = await this.couponRepository.findOne({
      where: {
        type: 'amount',
        and: [
          {payment_method: disountRequest.payment_method},
          {coupon_code: disountRequest.coupon_code},
          {min_amount: {lt: disountRequest.amount}},
          {valid_zones: {inq: disountRequest.valid_zones}}
        ]
      },
    })

    const response = coupon ?
      {
        order_id: disountRequest.order_id,
        subtotal: disountRequest.amount,
        discount_percentage: coupon.discount_percentage,
        discount_amount: 0,
        shipping_discount_percentage: 0,
        shipping_discount_amount: 0,
        total: 0,
      } as PriceDetail
      : Promise.reject(new Error('Coupon not found'))
    console.log('selectedCoupon', coupon)
    return response
  }


  /**
   * Get shipment discount
   */
  @get('/discount/ship/')
  @response(200, {
    description: 'Array of Coupon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DiscountRequest, {includeRelations: true}),
        },
      },
    }
  })
  async getShipDiscount(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRequest, {partial: true}),
        },
      },
    })
    disountRequest: DiscountRequest,
  ): Promise<DiscountRequest> {
    const coupons = await this.couponRepository.find({where: {type: 'ship'}})
    console.log(coupons)
    return disountRequest as DiscountRequest
  }
}
