
/**
 * Method for calculating discounted price
 * @param {number} price  Price to be discounted, greater or equal to zero
 * @param {number} discount Value between 0 and 100 representing discount percentage
 * @returns {number}
 */
module.exports.calculateDiscountPrice = function(price, discount) {
    // Error handling
    if(price === null || discount === null) throw new Error('Must provide both price and discount arguments')
    if(discount > 100 || discount < 0 ) throw new Error('Discount must be between 0 - 100');
    if(price < 0) throw new Error('Price must be greater than 0');
    // Return discounted price
    return price - (price * (discount / 100));
}