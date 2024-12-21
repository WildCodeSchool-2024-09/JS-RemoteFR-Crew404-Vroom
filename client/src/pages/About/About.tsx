import aboutCar from "../../assets/images/pictures/aboutCar.jpg";
import aboutCarGathering from "../../assets/images/pictures/aboutCarGathering.jpg";
import styles from "./About.module.css";

function About() {
  return (
    <div>
      <div className={styles.backgroundAbout}>
        <h1 className={styles.titleAbout}>About</h1>
        <img src={aboutCar} alt="Créateur." className={styles.aboutCar} />
        <p className={styles.pAbout}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur in
          suscipit atque officiis repellendus rem praesentium reprehenderit
          laudantium? Velit corrupti possimus laudantium quam placeat quia enim
          adipisci consectetur at obcaecati! Repellat recusandae facere modi
          quidem rem libero, temporibus nisi laborum quia doloremque commodi?
          Voluptatem quos corporis laudantium mollitia. Totam iure ab culpa
          accusantium officia corrupti id possimus magnam fugiat temporibus.
          Esse molestiae eum debitis veniam hic laudantium reiciendis odit
          ipsam, quibusdam, blanditiis deleniti ipsa praesentium maiores
          incidunt quidem cupiditate quod vitae amet sed asperiores eos quam
          accusamus totam iure? Nesciunt. Natus labore ex, ipsa ea facere illo
          maiores error ut neque porro voluptate commodi itaque laboriosam
          repudiandae explicabo quis eum exercitationem perferendis? Aperiam
          corrupti est ab facere distinctio. Quia, facilis. Dolore expedita,
          laborum dignissimos placeat mollitia facere neque perspiciatis
          repellendus numquam. Perspiciatis fugit accusantium, sunt id ex optio,
          quis at iusto aliquid atque laborum nobis veniam quas aut iste
          nesciunt! Deleniti, quam temporibus.
        </p>
        <img
          src={aboutCarGathering}
          alt="Rassemblement de véhicules exclusifs."
          className={styles.aboutCarGathering}
        />
      </div>
    </div>
  );
}

export default About;
