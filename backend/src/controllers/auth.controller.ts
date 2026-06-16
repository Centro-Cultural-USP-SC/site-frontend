import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const result = await authService.login({
        email,
        password,
      });

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  }
}

export default new AuthController();