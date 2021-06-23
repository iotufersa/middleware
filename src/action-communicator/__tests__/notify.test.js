const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

const seed01 = {
  creator: "identifier01",
  receiver: {
    identifiers: ["identifier01"],
    protocol: "coap",
    uri: "coap://localhost/deviceX"
  },
  scope: {
    data: {"humidity":15},
    commands: {"water-pump":true}
  },
  lifetime: {
    validity: false,
    count: 0
  },
  status: true
};

const seed02 = {
  creator: "identifier01",
  receiver: {
    identifiers: ["identifier01"],
    protocol: "http_rest",
    uri: "http://localhost/deviceX"
  },
  scope: {
    data: {"humidity":15},
    commands: {"water-pump":true}
  },
  lifetime: {
    validity: false,
    count: 0
  },
  status: true
};

describe("Received action", () => {
  jest.setTimeout(30000);
  it("Should to dispatch action for resources", async () => {
    return Promise.resolve().then(() => {
      return request.post(`/actionCommunicator/notify`).send(seed02).expect(200);
    }).then((res)=>console.log(res.text));
  });
});
