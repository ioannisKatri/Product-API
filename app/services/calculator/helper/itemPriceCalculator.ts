import Item from "../item";
import {apiErrCodes} from "../../../logging-codes/loggingCodes";
import {isNotPositiveNumberOrBellowZero} from "../../../utilities/utilities";


export default new class ItemCalculator {

    itemPriceCalculator(item: Item) :number {
        if (!item) return 0;
        // calculates the full price by multiplying quantity and unit price
        const full_price: number = item.unitPrice * item.quantity;
        if (isNotPositiveNumberOrBellowZero(full_price)) throw new Error(apiErrCodes.INVALID_NUMBER);

        //checks if discount is valid number
        let isInvalidDiscountNumber = item.totalDiscount  && isNotPositiveNumberOrBellowZero(item.totalDiscount);
        if (isInvalidDiscountNumber) throw new Error(apiErrCodes.INVALID_DISCOUNT);

        //calculate total price
        const total_price = item.totalDiscount ? (full_price - item.totalDiscount) : full_price;
        if (isNotPositiveNumberOrBellowZero(total_price)) throw new Error(apiErrCodes.INVALID__TOTAL_PRICE);

        return total_price
    }

};