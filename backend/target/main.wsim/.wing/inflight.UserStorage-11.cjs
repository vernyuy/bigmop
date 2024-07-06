"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $User, $std_Number }) {
  class UserStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(user) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const userJson = ({"id": id, "firstName": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "firstName"), "lastName": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "lastName"), "dob": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "dob"), "email": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "email"), "username": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "username"), "imageUrl": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(user, "imageUrl")});
      (await this._add(id, userJson));
      console.log(String.raw({ raw: ["adding user ", " with data: ", ""] }, id, JSON.stringify(userJson)));
      return String.raw({ raw: ["User with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting user ", ""] }, id));
    }
    async get(id) {
      const userJson = (await this.$this_db.tryGet(id));
      return $User._fromJson(userJson);
    }
    async list() {
      const userJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, userJson.length));
      return userJson;
    }
    async updateUser(id, qty) {
      const userId = id;
      const orderQty = qty;
      const response = (await this.$this_db.tryGet(userId));
      const prodQty = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($helpers.unwrap(response), "qty");
      const totalQty = ((await $std_Number.fromJson(prodQty)) - orderQty);
      const updatedItem = ({"qty": totalQty});
      (await this.$this_db.update(userId, updatedItem));
    }
  }
  return UserStorage;
}
//# sourceMappingURL=inflight.UserStorage-11.cjs.map