// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {get} from '@loopback/rest';


export class DiscountController {
  /**
   * Get discount
   */
  @get('/discount/{data}')
  getDiscount(): Object {
    return {}
  }

  /**
   * Get discount
   */
  @get('/discount/ship/{data}')
  getShippingDiscount(): Object {
    return {}
  }
}
