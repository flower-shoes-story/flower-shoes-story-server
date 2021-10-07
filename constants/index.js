const TYPE = {
  GOMSIN: "gomsin",
  SOLDIER: "soldier",
};

const NUMBER = {
  ONEDAY: 1000 * 60 * 60 * 24,
};

const MESSAGE = {
  AUTHORIZED: "user authorized successfully",
};

const EVENTS = {
  JOIN: "join",
  GET_MESSAGE: "getMessage",
  SEND_MESSAGE: "sendMessage",
  DISCONNECT: "disconnect",
};

module.exports = { NUMBER, MESSAGE, TYPE, EVENTS };
