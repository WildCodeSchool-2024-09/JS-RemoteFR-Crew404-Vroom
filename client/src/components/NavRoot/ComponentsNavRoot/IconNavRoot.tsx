import github from "../../../assets/data-img/github-icon.png";
import linkedin from "../../../assets/data-img/linkedin-icon.png";
import mail from "../../../assets/data-img/mail-icon.webp";

interface IconNavRoot {
  iconNav: string;
}

function IconNavRoot(Props: IconNavRoot) {
  const { iconNav } = Props;
  return (
    <section>
      <div className={iconNav}>
        <img src={github} alt="GitHub" />
      </div>
      <div className={iconNav}>
        <img src={linkedin} alt="Linkedin" />
      </div>
      <div className={iconNav}>
        <img src={mail} alt="Mail" />
      </div>
    </section>
  );
}

export default IconNavRoot;
