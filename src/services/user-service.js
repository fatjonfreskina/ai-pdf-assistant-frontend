import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

class ApiService {
    async fetchUser() {
        const res = await fetch("https://localhost:3000/user");
        const user = await res.json();

        if (true) {
            authStore.updateUser(user)
        }
    }

    async login(email, password) {
        const res = await fetch("https://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const user = await res.json();

        if (true) {
            authStore.updateUser(user)
        }
    }

    async register(email, password) {
        const res = await fetch("https://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const response = await res.json();
        console.log(response);
    }
}

export default new ApiService();