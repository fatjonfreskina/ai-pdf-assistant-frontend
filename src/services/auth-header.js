import { useAuthStore } from "@/stores/auth";

export default function authHeader() {
  const authStore = useAuthStore();
  let user = authStore.getUser;

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}