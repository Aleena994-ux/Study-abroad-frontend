import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});


// Automatically send JWT
// with every request

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }
);


// LOGIN

export const loginUser =
  (data) =>
    api.post(
      "/auth/login",
      data
    );


// REGISTER

export const registerUser =
  (data) =>
    api.post(
      "/auth/register",
      data
    );


// USER SUBMISSION

export const createSubmission =
  (formData) =>
    api.post(
      "/submissions",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );


// ADMIN GET SUBMISSIONS

export const getSubmissions =
  () =>
    api.get(
      "/submissions"
    );


// ADMIN DELETE

export const deleteSubmission =
  (id) =>
    api.delete(
      `/submissions/${id}`
    );


export default api;