import {Coupon, DiscountRequest, PriceDetail} from '../models';

export function formatResponse(request: DiscountRequest, coupon: Coupon): PriceDetail {
  // Amount discount
  let discount = 0
  let discountPercentage = 0

  // Shipping discount
  let shippingDiscountPercentage = 0
  let shippingDiscount = 0

  // Set discount depending on coupon type
  if (coupon.type === 'amount') {
    discountPercentage = coupon.discount_percentage || 0
    discount = request.amount * Number(coupon.discount_percentage) / 100
  } else if (coupon.type === 'ship') {
    shippingDiscountPercentage = coupon.discount_percentage || 0
  }

  // Calculate total [Only for amount type does not include shipping]
  const total = request.amount - discount

  // Set response object
  const response = {
    order_id: request.order_id || '',
    subtotal: request.amount,
    discount_percentage: discountPercentage,
    discount_amount: discount,
    shipping_discount_percentage: shippingDiscountPercentage,
    shipping_discount_amount: shippingDiscount,
    total: total
  } as PriceDetail


  return response
}
