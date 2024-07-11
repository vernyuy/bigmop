"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $SubCategory }) {
  class SubCategoryStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(subSubCategory) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const subSubCategoryJson = ({"id": id, "name": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(subSubCategory, "name"), "description": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(subSubCategory, "description")});
      (await this._add(id, subSubCategoryJson));
      console.log(String.raw({ raw: ["adding task ", " with data: ", ""] }, id, JSON.stringify(subSubCategoryJson)));
      return String.raw({ raw: ["Product with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting subSubCategory ", ""] }, id));
    }
    async get(id) {
      const subSubCategoryJson = (await this.$this_db.tryGet(id));
      return $SubCategory._fromJson(subSubCategoryJson);
    }
    async list() {
      const subSubCategoryJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, subSubCategoryJson.length));
      return subSubCategoryJson;
    }
  }
  return SubCategoryStorage;
}
//# sourceMappingURL=inflight.SubCategoryStorage-14.cjs.map