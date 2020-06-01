const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchesSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const MatchesModel = mongoose.model("Matches", matchesSchema);

module.exports = MatchesModel;
