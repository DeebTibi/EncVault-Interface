"use server";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

function getStub() {
  var PROTO_PATH =
    process.cwd() + "/scripts/grpc/clients/registry/Registry.proto";
  // Suggested options for similarity to existing grpc.load behavior
  var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  // The protoDescriptor object has the full package hierarchy
  var registry = protoDescriptor.Registry;
  var stub = new registry("localhost:8502", grpc.credentials.createInsecure());
  return stub;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function Discover(serviceName) {
  var stub = getStub();

  return new Promise((resolve, reject) =>
    stub.Discover({ service_name: serviceName }, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(
        response.service_ips[
          randomIntFromInterval(0, response.service_ips.length - 1)
        ]
      );
    })
  );
}

module.exports = Discover;
