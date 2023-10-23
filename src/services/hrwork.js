import apiCall from "./api";


export const generateUser = async (data) => {
    return await apiCall({
      url: "/api/hrwork/generateUser",
      method: "POST",
      data,
    });
  };

export const sendToken = async (data) => {
  console.log(data);
  return await apiCall({
    url: "/api/hrwork/sendToken",
    method: "POST",
    data,
  });
};

export const fetchTokens = async (data) => {
  return await apiCall({
    url: "/api/hrwork/fetchTokens",
    method: "GET",
  });
};

export const deleteToken = async (data) => {
  console.log(data);
  return await apiCall({
    url: "/api/hrwork/deleteToken",
    method: "POST",
    data,
  });
};