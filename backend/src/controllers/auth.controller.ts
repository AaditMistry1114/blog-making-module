import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";

const authService = new AuthService();

export class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    try {
      const token = await authService.login(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        throw new AppError(401, "Invalid email or password");
      }
      throw error;
    }
  });
}
