import type { Request, Response } from "express";

async function authResetPassword(req: Request, res: Response) {
  try {
    // res.status(200).json({ reponse: "Mail envoyé avec succès !", data: req.body })
    res
      .status(200)
      .json({ reponse: "Un email de reinitialisation vous a été envoyé !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne serveur." });
    console.error({
      identity: "authResetPassword.ts",
      type: "middleware",
      chemin: "/server/src/modules/reset_password/authResetPassword.ts",
      "❌ Nature de l'erreur": "Erreur non gérée dans le serveur !",
      details: error,
    });
    return;
  }
}

export default authResetPassword;
