import api from "./api";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function getPessoas() {
  const res = await api.get("/v1/persons");
  return res.data;
}

export async function getPessoaById(id) {
  const res = await api.get(`/v1/persons/${id}`);
  return res.data;
}

export async function createPessoa(data) {
  const res = await api.post("/v1/persons", data);
  return res.data;
}

export async function updatePessoa(id, data) {
  const res = await api.put(`/v1/persons/${id}`, data);
  return res.data;
}

export async function deletePessoa(id) {
  const res = await api.delete(`/v1/persons/${id}`);
  return res.data;
}
