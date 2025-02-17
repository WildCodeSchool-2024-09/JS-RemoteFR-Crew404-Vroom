import type { Request, Response } from "express";

async function authEmail(req: Request, res: Response) {
  try {
    // res.status(200).json({ reponse: "Mail envoyé avec succès !", data: req.body })
    res.status(200).json({ reponse: "Route mail existant", data: req.body });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne serveur." });
    console.error({
      identity: "authEmail.ts",
      type: "route email",
      chemin: "/server/src/modules/email/authEmail.ts",
      "❌ Nature de l'erreur": "Erreur non gérée dans le serveur !",
      details: error,
    });
    return;
  }
}

export default authEmail;
