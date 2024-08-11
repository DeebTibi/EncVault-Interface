"use server";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var Discover = require("@/scripts/grpc/clients/registry/client");

var PROTO_PATH =
  process.cwd() + "/scripts/grpc/clients/user_auth/UserAuth.proto";
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var userauth = protoDescriptor.user_auth;

async function getStub() {
  const ip = await Discover("user_auth");
  var stub = new userauth.UserAuth(ip, grpc.credentials.createInsecure());
  return stub;
}

async function AuthenticateToken(user_name, token) {
  var stub = await getStub();

  return new Promise((resolve, reject) =>
    stub.AuthenticateToken({ user_name, token }, function (err, response) {
      if (err) {
        return resolve(false);
      }
      resolve(response.value);
    })
  );
}

async function Login(user_name, password) {
  var stub = await getStub();

  return new Promise((resolve, reject) =>
    stub.Login({ user_name, password }, function (err, response) {
      if (err) {
        return resolve({ success: false });
      }
      resolve({ success: true, token: response.token });
    })
  );
}

async function Register(user_name, password, userKey) {
  var stub = await getStub();

  return new Promise((resolve, reject) =>
    stub.Register({ user_name, password, userKey }, function (err, response) {
      if (err) {
        return resolve({ success: false });
      }
      resolve({ success: true, token: response.token });
    })
  );
}

module.exports = { AuthenticateToken, Login, Register };
