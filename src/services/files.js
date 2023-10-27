import apiCall from "./api";

export const deleteFile = async (userId, fileType) => {
  return await apiCall({
    url: `/api/files/${userId}/${fileType}`,
    method: "DELETE",
  });
};

export const getUserFilesInfo = async (userId) => {
  return await apiCall({
    url: `/api/files/${userId}`,
    method: "GET",
  });
};

export const downloadFileByType = async (userId,fileType) => {
  return await apiCall({
    url: `/api/files/${userId}/${fileType}`,
    method: "GET",
  });
};
