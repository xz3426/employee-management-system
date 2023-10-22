import apiCall from "./api";

export const deleteFileByIndex = async (userId, fileIndex) => {
  return await apiCall({
    url: `/api/files/${userId}/${fileIndex}`,
    method: "DELETE",
  });
};

export const getUserFilesInfo = async (userId) => {
  return await apiCall({
    url: `/api/files/${userId}`,
    method: "GET",
  });
};
