import api from "./api";

export async function loginUser({ login, senha }) {
  const res = await api.post("/v1/auth", { login, senha });
  return res.data;
}
