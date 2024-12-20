#Attention, pour lancer cette commande il faudra : 

#Lancer la commande suivante dans le terminal git :
# chmod +x git-commit.sh
#Copier coller cette ligne dans package.json dans script :
# "commit": "bash ./git-commit.sh"
#Exécution de cette commande avec :
# npm run commit

#!/bin/bash

# Emplacement du fichier pour stocker les informations de l'agent
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

# Étape 1 : Vérification avec Biome pour corriger les fichiers
echo "🚀 Exécution de Biome..."
echo "🛠️ Modification des fichiers nécessaires"
npx @biomejs/biome check --fix --unsafe ./client
echo "✅ Exécution de Biome terminée"

# Étape 2 : Affiche l'état actuel du dépôt
echo "📄 Vérification de l'état actuel du dépôt..."
git status

# Étape 3 : Demande le message de commit
read -p "Entrez votre message de commit : " msg

# Étape 4 : Récupère les fichiers modifiés, nouveaux et supprimés
files=$(git ls-files --modified --deleted --others --exclude-standard)

# Étape 5 : Vérifie s'il y a des fichiers à ajouter
if [ -z "$files" ]; then
    echo "❌ Aucun fichier modifié, supprimé ou nouveau fichier à ajouter. Commit annulé."
    exit 1
fi

# Étape 6 : Ajoute les fichiers modifiés, nouveaux et supprimés
echo "📄 Ajout des fichiers au staging..."
git add -A

# Étape 7 : Crée un fichier temporaire pour le message de commit
echo "$msg" > .gitmessage.txt

# Étape 8 : Effectue le commit
echo "📝 Création du commit..."
git commit -F .gitmessage.txt

# Étape 9 : Supprime le fichier temporaire
rm .gitmessage.txt

# Étape 10 : Récupère le nom de la branche actuelle
echo "🌿 Récupération du nom de la branche actuelle"
branch=$(git rev-parse --abbrev-ref HEAD)

# Étape 11 : Pousse sur la branche courante
echo "🚀 Pousse sur la branche '$branch'..."
git push origin "$branch" || { echo "❌ Erreur : Push échoué."; exit 1; }
echo "✅ Commit réussi, envoi sur la branche '$branch'..."
