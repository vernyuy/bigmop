"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Notification }) {
  class NotificationStorage {
    constructor({ $this_counter, $this_db }) {
      this.$this_counter = $this_counter;
      this.$this_db = $this_db;
    }
    async _add(id, j) {
      (await this.$this_db.insert(id, j));
    }
    async add(notification) {
      const id = String.raw({ raw: ["", ""] }, (await this.$this_counter.inc()));
      const notificationJson = ({"id": id, "name": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(notification, "name"), "description": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(notification, "description")});
      (await this._add(id, notificationJson));
      console.log(String.raw({ raw: ["adding task ", " with data: ", ""] }, id, JSON.stringify(notificationJson)));
      return String.raw({ raw: ["Product with id ", " added successfully"] }, id);
    }
    async remove(id) {
      (await this.$this_db.delete(id));
      console.log(String.raw({ raw: ["deleting notification ", ""] }, id));
    }
    async get(id) {
      const notificationJson = (await this.$this_db.tryGet(id));
      return $Notification._fromJson(notificationJson);
    }
    async list() {
      const notificationJson = (await this.$this_db.list());
      console.log(String.raw({ raw: ["", ""] }, notificationJson.length));
      return notificationJson;
    }
  }
  return NotificationStorage;
}
//# sourceMappingURL=inflight.NotificationStorage-16.cjs.map