const axios = require("axios");
const FormData = require("form-data");
const Discover = require("../grpc/clients/registry/client");

async function uploadFile(form, userId, clientToken, userKey) {
  const headers = {
    "User-ID": userId,
    "Client-Token": clientToken,
    "User-Key": userKey,
    "Content-Type": "application/octet-stream",
  };

  try {
    const ip = await Discover("file_upload");
    const response = await axios.post("http://" + ip + "/upload", form, {
      headers,
    });
    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function getFiles(userId, clientToken) {
  const headers = {
    "User-ID": userId,
    "Client-Token": clientToken,
  };

  try {
    const ip = await Discover("file_upload");
    const response = await axios.get("http://" + ip + "/myfiles", { headers });
    console.log("Files fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function downloadFile(userId, clientToken, userKey, fileId) {
  const headers = {
    "User-ID": userId,
    "Client-Token": clientToken,
    "User-Key": userKey,
  };

  try {
    const ip = await Discover("file_upload");
    const response = await axios.get("http://" + ip + "/download", {
      params: { file: fileId },
      headers,
      responseType: "arraybuffer",
    });
    console.log("File downloaded successfully");
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

module.exports = { uploadFile, getFiles, downloadFile };
