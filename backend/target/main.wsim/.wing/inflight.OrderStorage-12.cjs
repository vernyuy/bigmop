"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Order }) {
  class OrderStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async add(name, productData) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      (await this.$this_db.insert(id, productData));
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting product ", ""] }, id));
    }
    async get(id) {
      const orderJson = (await this.$this_db.tryGet(id));
      return $Order._fromJson(orderJson);
    }
    async list() {
      const orderJson = (await this.$this_db.list());
      return orderJson;
    }
    async updateOrderStatus(id, status) {
      const updatedItem = ({"status": status});
      (await this.$this_db.update(id, updatedItem));
    }
  }
  return OrderStorage;
}
//# sourceMappingURL=inflight.OrderStorage-12.cjs.map