import type { User } from "@/lib/data";

export const DEFAULT_USER: User = {
  id: 1,
  name: "Juan Pérez",
  email: "usuario@test.com",
  password: "password123",
  progress: 30,
  badges: ["Linux Rookie", "Command Master"],
  racha: 5,
  activity: [2, 4, 1, 3, 5, 2, 6],
};
