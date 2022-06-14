const { Schema, model, Types } = require('mongoose');

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;