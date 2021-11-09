import {Coupon, DiscountRequest, PriceDetail} from '../models';

export function formatResponse(request: DiscountRequest, coupons: Coupon[]): PriceDetail {
  // Amount discount
  let discount = 0
  let discountPercentage = 0

  // Shipping discount
  let shippingDiscountPercentage = 0
  let shippingDiscount = 0
  console.log('coupons', coupons)
  // Set discount depending on coupon type
  coupons.forEach(c => {
    if (c.type === 'amount') {
      discountPercentage = c.discount_percentage || 0
      discount = request.amount * Number(c.discount_percentage) / 100
    } else if (c.type === 'ship') {
      shippingDiscountPercentage = c.discount_percentage || 0
    }
  })

  // Calculate total [Only for amount type does not include shipping]
  const total = request.amount - discount

  // Set response object
  const response = {
    order_id: request.order_id || '',
    subtotal: request.amount,
    discount_percentage: discountPercentage,
    discount_amount: discount,
    shipping_discount_percentage: shippingDiscountPercentage,
    total: total
  } as PriceDetail


  return response
}
