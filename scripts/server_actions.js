"use server";
const {
  Login,
  Register,
  AuthenticateToken,
} = require("@/scripts/grpc/clients/user_auth/client");

const { ChangeKey } = require("@/scripts/grpc/clients/key_maker/client");

const {
  uploadFile,
  getFiles,
  downloadFile,
} = require("@/scripts/http/file_upload");
/*
    handleLogin function is called when the user clicks the login button.
    should call the api to verify login credentials. and get token.
*/
export async function submitLogin(userName, password) {
  const { success, token } = await Login(userName, password);
  if (success) {
    return token;
  }
  return "";
}

/* 
    handleSignup function is called when the user clicks the signup button.
    should call the api to create a new user and get token.
*/
export async function submitSignup(userName, password, userKey) {
  const { success, token } = await Register(userName, password, userKey);
  if (success) {
    return token;
  }
  return "";
}

export async function verifyToken(userName, token) {
  const res = await AuthenticateToken(userName, token);
  return res;
}

export async function serverUploadFile(userName, token, userKey, formData) {
  if (!userKey || !token || !userName) {
    return { success: false };
  }

  if (!formData) {
    return { success: false };
  }

  try {
    const res = await uploadFile(formData, userName, token, userKey);
    return res;
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export async function serverGetFiles(userName, token) {
  if (!token || !userName) {
    return { success: false, error: false };
  }
  try {
    const res = await getFiles(userName, token);
    return { success: true, files: res };
  } catch (e) {
    console.log(e);
    return { success: false, error: true };
  }
}

export async function serverDownloadFile(fileName, userName, token, userKey) {
  if (!token || !userName || !fileName || !userKey) {
    return { success: false };
  }
  try {
    const res = await downloadFile(userName, token, userKey, fileName);
    if (!res) {
      return { success: false };
    }
    const base64String = Buffer.from(res).toString("base64");
    return { success: true, data: base64String };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export async function revokeURL(url) {
  URL.revokeObjectURL(url);
}

export async function serverChangeUserKey(userId, oldKey, newKey) {
  if (!userId || !oldKey || !newKey) {
    return { success: false };
  }

  try {
    const res = await ChangeKey(userId, oldKey, newKey);
    return res;
  } catch (e) {
    console.log("failed to change key", e);
    return { success: false };
  }
}
