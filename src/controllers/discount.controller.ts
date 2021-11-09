
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, requestBody, response} from '@loopback/rest';
import {PriceDetail} from '../models';
import {DiscountRequest} from '../models/discount-request.model';
import {CouponRepository} from '../repositories';
import {formatResponse} from '../utils/discounts';

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
    // Get coupon
    const coupon = await this.couponRepository.find({
      where: {
        payment_method: disountRequest.payment_method,
        and: [
          {coupon_code: disountRequest.coupon_code},
          {min_amount: {lt: disountRequest.amount}},
          {valid_zones: {inq: disountRequest.valid_zones}}
        ]
      },
    })

    // Response format for discount
    function response(): PriceDetail {
      try {
        return formatResponse(disountRequest, coupon)
      } catch (error) {
        throw new Error(error)
      }
    }

    return response()
  }


  /**
   * Get shipment discount
   */
  //   @get('/discount/ship/')
  //   @response(200, {
  //     description: 'Array of Coupon model instances',
  //     content: {
  //       'application/json': {
  //         schema: {
  //           type: 'array',
  //           items: getModelSchemaRef(DiscountRequest, {includeRelations: true}),
  //         },
  //       },
  //     }
  //   })
  //   async getShipDiscount(
  //     @requestBody({
  //       content: {
  //         'application/json': {
  //           schema: getModelSchemaRef(DiscountRequest, {partial: true}),
  //         },
  //       },
  //     })
  //     disountRequest: DiscountRequest,
  //   ): Promise<PriceDetail> {
  //     // Get coupon
  //     const coupon = await this.couponRepository.findOne({
  //       where: {
  //         type: 'ship',
  //         and: [
  //           {payment_method: disountRequest.payment_method},
  //           {coupon_code: disountRequest.coupon_code},
  //           {min_amount: {lt: disountRequest.amount}},
  //           {valid_zones: {inq: disountRequest.valid_zones}}
  //         ]
  //       },
  //     })

  //     // Response format for discount
  //     const response = () => coupon
  //       ? formatResponse(disountRequest, coupon)
  //       : Promise.reject(new Error('Coupon not found'))

  //     console.log('selectedCoupon', coupon)

  //     return response().catch((err: string) => {
  //       Sentry.captureException(err);
  //     })
  //   }
}
