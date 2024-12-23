# Cette commande permet de lancer la vérification Biome
# et de faire toutes les modifications automatiques de Biome
# Crée un agent pour le mot de passe SSH
# Ajoute tous les fichiers modifiés au commit
# Force le commit et contourne Husky
# Pousse sur la branche actuelle automatiquement


# Attention, pour lancer cette commande il faudra : 

# Lancer la commande suivante dans le terminal git :
# chmod +x npm-run-commit-force-biome-husky.sh
# Copier coller cette ligne dans package.json dans script :
# "commit-force": "bash ./npm-run-commit-force-biome-husky.sh"
# Exécution de cette commande avec :
# npm run commit-force

#Pour forcer le passage du Husky :
# HUSKY=0 git commit -m ""

#!/bin/bash

#Version du script
echo -e "\033[35mVersion du script V5.2.7\033[0m"
echo ""
echo ""
echo -e "\033[35mDébut d'exécution du script\033[0m"

# Etape 1 : Retrait des fichiers en zone de staging
echo "\033[36m🗑️. Retrait des fichiers en zone de staging\033[0m"
git reset

# Etape 2 : Vérification agent SSH
# Emplacement du fichier pour stocker les informations de l'agent
echo "🔍 Vérification si un agent SSH est actif"
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
echo "🔄 Recharger ou démarrer l'agent SSH"
if [ -f "$SSH_ENV" ]; then
    source "$SSH_ENV" > /dev/null
    if ! ps -p $SSH_AGENT_PID > /dev/null 2>&1; then
        start_agent
    fi
else
    start_agent
fi
echo "✅ Traitement agent SSH terminé"

# Étape 3 : Vérification avec Biome pour corriger les fichiers
echo "🚀 Exécution de Biome..."
echo "🛠️ Modification des fichiers nécessaires"
npx @biomejs/biome check --fix --unsafe ./client
echo "✅ Exécution de Biome terminée"

# Étape 4 : Affiche l'état actuel du dépôt
echo "📄 Vérification de l'état actuel du dépôt..."
git status

# Étape 5 : Demande le message de commit
read -p "Entrez votre message de commit : " msg

# Étape 6 : Récupère les fichiers modifiés, nouveaux et supprimés
files=$(git ls-files --modified --deleted --others --exclude-standard)

# Étape 7 : Vérifie s'il y a des fichiers à ajouter
if [ -z "$files" ]; then
    echo "❌ Aucun fichier modifié, supprimé ou nouveau fichier à ajouter. Commit annulé."
    exit 1
fi

# Étape 8 : Ajoute les fichiers modifiés, nouveaux et supprimés
echo "📄 Ajout des fichiers au staging..."
git add -A

# Étape 9 : Crée un fichier temporaire pour le message de commit
echo "$msg" > .gitmessage.txt

# Étape 10 : Effectue le commit
echo "📝 Création du commit..."
HUSKY=0 git commit -F .gitmessage.txt

# Étape 11 : Supprime le fichier temporaire
rm .gitmessage.txt

# Étape 12 : Récupère le nom de la branche actuelle
echo "🌿 Récupération du nom de la branche actuelle"
branch=$(git rev-parse --abbrev-ref HEAD)

# Étape 13 : Pousse sur la branche courante
echo "🚀 Pousse sur la branche '$branch'..."
git push origin "$branch" || { echo "❌ Erreur : Push échoué."; exit 1; }
echo "✅ Commit réussi, envoi sur la branche '$branch'..."
