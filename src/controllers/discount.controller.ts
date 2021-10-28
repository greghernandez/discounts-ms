
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, requestBody, response} from '@loopback/rest';
import {Coupon, PriceDetail} from '../models';
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
    let selectedCoupon: Coupon = {} as Coupon
    const coupon = await this.couponRepository.findOne({
      where: {
        type: 'amount',
        and: [
          {payment_method: disountRequest.payment_method},
          {coupon_code: disountRequest.coupon_code}
        ]
      },
    })
    // Check if coupon zones are included
    if (coupon) {
      // Check if coupon zones are included
      if (coupon?.valid_zones.some(zone => disountRequest.valid_zones.includes(zone))) {
        selectedCoupon = coupon
      }
    }
    const response = selectedCoupon ?
      {
        order_id: disountRequest.order_id,
        subtotal: 0,
        discount_percentage: selectedCoupon.discount_percentage,
        discount_amount: 0,
        shipping_discount_percentage: 0,
        shipping_discount_amount: 0,
        total: 0,
      } as PriceDetail
      : Promise.reject(new Error('Coupon not found'))
    console.log('selectedCoupon', selectedCoupon)
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
