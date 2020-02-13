const lib = require('../lib/lib');

describe('calculateDiscountPrice', () => {
    it('should return the discounted price', () => {
        let price = 20;
        let discount = 50;
        let result = lib.calculateDiscountPrice(price, discount);
        expect(result).toBe(10);
    });
    it('should return the same price if discount is 0', () => {
        let price = 20;
        let discount = 0;
        let result = lib.calculateDiscountPrice(price, discount);
        expect(result).toBe(20);
    });
    it('should return 0 if price is 0', () => {
        let price = 0;
        let discount = 50;
        let result = lib.calculateDiscountPrice(price, discount);
        expect(result).toBe(0);
    });
    it('should throw error if discount is more than 100', () => {
        let price = 20;
        let discount = 101;
        expect(() => { lib.calculateDiscountPrice(price, discount); }).toThrow();
    });
    it('should throw error if discount is less than 0', () => {
        let price = 20;
        let discount = -1;
        expect(() => { lib.calculateDiscountPrice(price, discount); }).toThrow();
    });
    it('should throw error if price is less than 0', () => {
        let price = -1;
        let discount = 50;
        expect(() => { lib.calculateDiscountPrice(price, discount); }).toThrow();
    });
    it('should throw error if price is null', () => {
        let price = null;
        let discount = 50;
        expect(() => { lib.calculateDiscountPrice(price, discount); }).toThrow();
    });
    it('should throw error if discount is null', () => {
        let price = 20;
        let discount = null;
        expect(() => { lib.calculateDiscountPrice(price, discount); }).toThrow();
    });
});
