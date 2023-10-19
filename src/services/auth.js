import apiCall from "./api";

export const signUp = async (data) => {
  return await apiCall({
    url: "/api/auth/signup",
    method: "POST",
    data,
  });
};

export const signIn = async (data) => {
  return await apiCall({
    url: "/api/auth/signin",
    method: "POST",
    data,
  });
};

export const changePwd = async (data) => {
  return await apiCall({
    url: "/api/auth/changePwd",
    method: "POST",
    data,
  });
};

export const updatePwd = async (data) => {
  return await apiCall({
    url: "/api/auth/updatePwd",
    method: "POST",
    data,
  });
};

export const populateDetail = async (data) => {
  return await apiCall({
    url: "/api/auth/populateUserDetail",
    method: "POST",
    data,
  });
};

export const getUserDetailById = async (data) => {
  return await apiCall({
    url: `/api/auth/userDetail/${data.id}`,
    method: "GET",
    data,
  });
};

export const getUserApplicationStatus = async (id) => {
  return await apiCall({
    url: `/api/auth/${id}`,
    method: "GET",
  });
};
