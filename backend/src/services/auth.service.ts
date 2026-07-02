import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

let adminPasswordHash: string | null = null;

export async function initAuth(): Promise<void> {
  adminPasswordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
}

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    if (!adminPasswordHash) {
      await initAuth();
    }

    if (email !== env.ADMIN_EMAIL) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash!);

    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "1d" });
  }
}
