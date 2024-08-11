"use server";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var Discover = require("@/scripts/grpc/clients/registry/client");

var PROTO_PATH =
  process.cwd() + "/scripts/grpc/clients/key_maker/KeyMaker.proto";
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var key_maker = protoDescriptor;

async function getStub() {
  const ip = await Discover("key_maker");
  var stub = new key_maker.KeyMaker(ip, grpc.credentials.createInsecure());
  return stub;
}

async function ChangeKey(user_name, old_key, new_key) {
  var stub = await getStub();

  return new Promise((resolve, reject) =>
    stub.ChangeUserKey(
      { userId: user_name, oldKey: old_key, newKey: new_key },
      function (err, response) {
        if (err) {
          return reject(err);
        }
        resolve({ success: true });
      }
    )
  );
}

module.exports = { ChangeKey };
