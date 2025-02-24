import type { Request, Response } from "express";

async function authConfirmResetPassword(req: Request, res: Response) {
  try {
    // res.status(200).json({ reponse: "Mail envoyé avec succès !", data: req.body })
    res
      .status(200)
      .json({ reponse: "Votre mot de passe a bien été reinitialisée !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne serveur." });
    console.error({
      identity: "authConfirmResetPassword.ts",
      type: "middleware",
      chemin: "/server/src/modules/reset_password/authConfirmResetPassword.ts",
      "❌ Nature de l'erreur": "Erreur non gérée dans le serveur !",
      details: error,
    });
    return;
  }
}

export default authConfirmResetPassword;
