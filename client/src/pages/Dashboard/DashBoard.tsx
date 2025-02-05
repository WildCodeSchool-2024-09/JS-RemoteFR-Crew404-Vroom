import { Helmet } from "react-helmet-async";
import DashboardRoot from "../../components/Dashboard/DashboardRoot";
import NavRoot from "../../components/NavRoot/NavRoot";

function Dashboard() {
  const SEO = {
    title: "Accueil - RoadAddict",
    autor: "Benjamin DELAHAYE",
    description: "Le site de voiture en France",
    url: "" /*URL de la page*/,
    img: "",
    twitterUrlImg: "" /*Lien URL de l'image*/,
    twitterCompte:
      "" /*@MonCompteTwitter*/ /*Permet d'identifier le compte officiel*/,
    keywords: {
      1: "" /* 1 mot clés */,
      2: "" /* 2 mots clés */,
      3: "" /* 3 mots clés */,
      4: "" /* 4 mots clés */,
      5: "" /* 5 mots clés */,
      6: "" /* 6 mots clés */,
      7: "" /* 7 mots clés */,
      8: "" /* 8 mots clés */,
      9: "" /* 9 mots clés */,
      10: "" /* 10 mots clés */,
      11: "" /* 11 mots clés */,
      12: "" /* 12 mots clés */,
      13: "" /* 13 mots clés */,
      14: "" /* 14 mots clés */,
      15: "" /* 15 mots clés */,
    } /* 10 a 15 mots max */,
    type: {
      website:
        "website" /*(Valeur par défaut) indique qu'il s'agit d'un site web classique.*/,
      article: "article" /*Pour des articles de blog ou du contenu éditorial.*/,
      video: "video.movie" /*Pour les pages contenant des vidéos de films.*/,
      music: "music.song" /*Pour les pages dédiées à la musique.*/,
      profile: "profile" /*Pour une page personnelle (profil d'une personne).*/,
    },
  };
  // Filtrer les mots-clés non vides
  const filterKeywords = Object.values(SEO.keywords)
    .filter((keyword) => keyword.trim() !== "")
    .join(", ");
  return (
    <>
      <Helmet />

      <NavRoot namePage="Tableau de bord" />

      <main>
        <DashboardRoot />
      </main>

      <footer />
    </>
  );
}

export default Dashboard;
