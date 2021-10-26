// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {del, get, patch, post} from '@loopback/rest';


export class CouponController {
  /**
   * Create a product
   */
  @post('/coupon')
  cretaCoupon(): Object {
    return {}
  }

  /**
   * Get all coupons
   */
  @get('/coupons/')
  coupons(): Object {
    return {}
  }

  /**
   * Get cupon by id
   */
  @get('/coupon/{id}')
  coupon(): Object {
    return {}
  }

  /**
   * Update coupon
   */
  @patch('/coupon/{id}')
  updateCoupon(): Object {
    return {}
  }

  /**
   * Delete coupon
   */
  @del('/coupon/{id}')
  deleteCoupon(): Object {
    return {}
  }
}
