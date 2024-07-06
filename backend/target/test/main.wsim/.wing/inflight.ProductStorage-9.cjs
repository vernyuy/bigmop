"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Product, $std_Number }) {
  class ProductStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(product) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const productJson = ({"id": id, "name": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(product, "name"), "qty": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(product, "qty"), "price": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(product, "price"), "imageUrl": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(product, "imageUrl")});
      (await this._add(id, productJson));
      console.log(String.raw({ raw: ["adding task ", " with data: ", ""] }, id, JSON.stringify(productJson)));
      return String.raw({ raw: ["Product with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting product ", ""] }, id));
    }
    async get(id) {
      const productJson = (await this.$this_db.tryGet(id));
      return $Product._fromJson(productJson);
    }
    async list() {
      const productJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, productJson.length));
      return productJson;
    }
    async updateProduct(id, qty) {
      const productId = id;
      const orderQty = qty;
      const response = (await this.$this_db.tryGet(productId));
      const prodQty = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($helpers.unwrap(response), "qty");
      const totalQty = ((await $std_Number.fromJson(prodQty)) - orderQty);
      const updatedItem = ({"qty": totalQty});
      (await this.$this_db.update(productId, updatedItem));
    }
  }
  return ProductStorage;
}
//# sourceMappingURL=inflight.ProductStorage-9.cjs.map