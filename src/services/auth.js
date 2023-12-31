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

export const submitOnboardingForm = async (data) => {
  return await apiCall({
    url: "/api/auth/submitOnboardingForm",
    method: "POST",
    data,
  });
};

export const getUserDetailById = async (userId) => {
  return await apiCall({
    url: `/api/auth/userDetail/${userId}`,
    method: "GET",
  });
};

export const getUserById = async (id) => {
  return await apiCall({
    url: `/api/auth/user/${id}`,
    method: "GET",
  });
};

export const getUserApplicationStatus = async (userId, applicationName) => {
  return await apiCall({
    url: `/api/auth/${userId}/${applicationName}`,
    method: "GET",
  });
};

export const fetchAllUsers = async () => {
  return await apiCall({
    url: `/api/auth/users`,
    method: "GET",
  });
};

export const getVisaStatus = async (userId) => {
  return await apiCall({
    url: `/api/auth/visaStatus/${userId}`,
    method: "GET",
  });
};
