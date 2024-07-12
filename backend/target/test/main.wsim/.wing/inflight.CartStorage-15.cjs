"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Cart }) {
  class CartStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, cartItem) {
      (await this.$this_db.insert(id, cartItem));
    }
    async addItemToCart(productId, userId, qty) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const cartJson = ({"id": id, "productId": productId, "userId": userId, "qty": qty, "status": "PENDING"});
      (await this._add(id, cartJson));
      console.log(String.raw({ raw: ["adding cart ", " with data: ", ""] }, id, JSON.stringify(cartJson)));
      return String.raw({ raw: ["Cart with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting cart ", ""] }, id));
    }
    async getCartItem(id, userId) {
      const cartJson = (await this.$this_db.tryGet(id));
      const cartItems = [];
      const userCartItems = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cartJson, "userId");
      const pendindCartItems = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(userCartItems, "PENDING");
      return $Cart._fromJson(pendindCartItems);
    }
    async updateCartStatus(id, userID) {
      const cartId = id;
      const response = (await this.$this_db.tryGet(cartId));
      const cartStatus = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($helpers.unwrap(response), "PENDING");
      const updatedItem = ({"status": "COMPLETED"});
      (await this.$this_db.update(cartId, updatedItem));
    }
    async updateCartProductQuantity(id, qty, userID, productID) {
      const cartId = id;
      const orderQty = qty;
      const userId = userID;
      const productId = productID;
      const response = (await this.$this_db.tryGet(cartId));
    }
  }
  return CartStorage;
}
//# sourceMappingURL=inflight.CartStorage-15.cjs.map