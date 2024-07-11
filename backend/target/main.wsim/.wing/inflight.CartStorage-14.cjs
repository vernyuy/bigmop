"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Cart, $std_Number }) {
  class CartStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(cart) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const cartJson = ({"id": id, "firstName": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "firstName"), "lastName": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "lastName"), "dob": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "dob"), "email": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "email"), "cartname": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "cartname"), "imageUrl": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(cart, "imageUrl")});
      (await this._add(id, cartJson));
      console.log(String.raw({ raw: ["adding cart ", " with data: ", ""] }, id, JSON.stringify(cartJson)));
      return String.raw({ raw: ["Cart with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting cart ", ""] }, id));
    }
    async get(id) {
      const cartJson = (await this.$this_db.tryGet(id));
      return $Cart._fromJson(cartJson);
    }
    async list() {
      const cartJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, cartJson.length));
      return cartJson;
    }
    async updateCart(id, qty) {
      const cartId = id;
      const orderQty = qty;
      const response = (await this.$this_db.tryGet(cartId));
      const prodQty = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($helpers.unwrap(response), "qty");
      const totalQty = ((await $std_Number.fromJson(prodQty)) - orderQty);
      const updatedItem = ({"qty": totalQty});
      (await this.$this_db.update(cartId, updatedItem));
    }
  }
  return CartStorage;
}
//# sourceMappingURL=inflight.CartStorage-14.cjs.map