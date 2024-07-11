"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Category }) {
  class CategoryStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(category) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const categoryJson = ({"id": id, "name": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(category, "name"), "description": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(category, "description")});
      (await this._add(id, categoryJson));
      console.log(String.raw({ raw: ["adding task ", " with data: ", ""] }, id, JSON.stringify(categoryJson)));
      return String.raw({ raw: ["Product with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting category ", ""] }, id));
    }
    async get(id) {
      const categoryJson = (await this.$this_db.tryGet(id));
      return $Category._fromJson(categoryJson);
    }
    async list() {
      const categoryJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, categoryJson.length));
      return categoryJson;
    }
  }
  return CategoryStorage;
}
//# sourceMappingURL=inflight.CategoryStorage-13.cjs.map