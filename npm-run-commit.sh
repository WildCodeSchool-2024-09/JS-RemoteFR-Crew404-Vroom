#Attention, pour lancer cette commande il faudra : 

#Lancer la commande suivante dans le terminal git :
# chmod +x -commit.sh
#Copier coller cette ligne dans package.json dans script :
# "commit": "bash ./npm-run-commit.sh"
#Exécution de cette commande avec :
# npm run commit

#!/bin/bash

# Emplacement du fichier pour stocker les informations de l'agent SSH
SSH_ENV="$HOME/.ssh-agent.env"

# Fonction pour démarrer un nouvel agent SSH
start_agent() {
    echo "🔑 Démarrage d'un nouvel agent SSH..."
    eval "$(ssh-agent -s)" > "$SSH_ENV"
    echo "export SSH_AUTH_SOCK=$SSH_AUTH_SOCK" >> "$SSH_ENV"
    echo "export SSH_AGENT_PID=$SSH_AGENT_PID" >> "$SSH_ENV"
    ssh-add ~/.ssh/id_ed25519 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "🔐 Clé SSH ajoutée avec succès : ~/.ssh/id_ed25519"
    else
        echo "❌ Échec lors de l'ajout de la clé SSH : ~/.ssh/id_ed25519"
    fi
}

# Recharger ou démarrer l'agent SSH
if [ -f "$SSH_ENV" ]; then
    source "$SSH_ENV" > /dev/null
    if ! ps -p $SSH_AGENT_PID > /dev/null 2>&1; then
        start_agent
    fi
else
    start_agent
fi

# Vérification avec Biome
echo "🛠️  Vérification du code avec Biome..."
output=$(npx @biomejs/biome check --fix --unsafe ./client)

# Vérifie le statut de la commande Biome
if echo "$output" | grep -q "error"; then
    echo "❌ Des erreurs critiques ont été détectées par Biome. Vous devez corriger votre code avant de continuer."
    exit 1
elif echo "$output" | grep -q "Fixed"; then
    echo "✍️  Biome a corrigé des fichiers. Ajout des modifications au staging..."
    git add client/src/pages/Test.tsx
else
    echo "✅ Aucun problème détecté par Biome. Continuation du script."
fi

# Vérification de l'état actuel du dépôt
echo "📄 Vérification de l'état actuel du dépôt..."
git status

# Vérifie s'il y a des fichiers à ajouter
files=$(git ls-files --modified --deleted --others --exclude-standard)
if [ -z "$files" ]; then
    echo "❌ Aucun fichier modifié, supprimé ou nouveau fichier à ajouter. Commit annulé."
    exit 1
fi

# Ajout de tous les fichiers restants
echo "📄 Ajout de tous les fichiers au staging..."
git add -A

# Demande le message de commit
read -p "Entrez votre message de commit : " msg

# Création du commit
echo "📝 Création du commit..."
git commit -m "$msg" || { echo "❌ Commit échoué. Vérifiez Husky ou les erreurs."; exit 1; }

# Récupère le nom de la branche actuelle
branch=$(git rev-parse --abbrev-ref HEAD)

# Pousse les modifications sur la branche courante
echo "🚀 Pousse sur la branche '$branch'..."
git push origin "$branch" || { echo "❌ Push échoué."; exit 1; }

echo "✅ Commit réussi, envoi sur la branche '$branch'..."
