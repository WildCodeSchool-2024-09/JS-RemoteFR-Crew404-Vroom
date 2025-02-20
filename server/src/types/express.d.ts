import type { User } from "../modules/auth/authRepository"; // Adapter selon ton projet

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

import type { AuthUser } from "../modules/auth/authRepository"; // Adapter selon l'organisation de ton projet

declare global {
  namespace Express {
    interface Request {
      user?: Omit<AuthUser, "password">; // ✅ `password` retiré
      uploadedFiles?: Record<string, string>; // ✅ Ajout pour éviter l'erreur `uploadedFiles`
    }
  }
}
