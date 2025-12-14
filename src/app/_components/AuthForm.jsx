import "./AuthForm.css";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AuthForm = ({
  titre,
  callActionTitre,
  showName,
  formAction,
  showGithub = false,
  children,
}) => {
  console.log(formAction);

  const formRef = useRef();

  useGSAP(() => {
    const form = formRef.current;

    gsap.from(form, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    const fields = form.querySelectorAll("input, button");

    gsap.from(fields, {
      opacity: 0,
      y: 25,
      stagger: 0.12,
      delay: 0.3,
      duration: 0.7,
      ease: "power2.out",
    });
  });

  return (
    <div className="form-background">
      <form ref={formRef} action={formAction} className="auth-form">
        <h2>{titre}</h2>
        {!showName ? (
          ""
        ) : (
          <div>
            <input
              type="text"
              id="fld_name"
              name="name"
              required
              placeholder="Nom complet"
            />
          </div>
        )}

        <div>
          <input
            type="email"
            id="fld_email"
            name="email"
            autoComplete="email"
            required
            placeholder="Courriel"
          />
        </div>

        <div>
          <input
            type="password"
            id="fld_password"
            placeholder="Mot de passe"
            name="password"
            required
          />
        </div>

        <button type="submit" className="form-cta-btn">
          <span className="form-cta-arrow left">→</span>
          <span className="form-cta-text">{callActionTitre}</span>
          <span className="form-cta-arrow right">→</span>
        </button>

        {showGithub && (
          <button type="button" className="form-cta-btn github">
            <span className="form-cta-arrow left">
              <img src="/png/github.png" alt="GitHub" />
            </span>
            <span className="form-cta-text">Se connecter avec GitHub</span>
            <span className="form-cta-arrow right">
              <img src="/png/github.png" alt="GitHub" />
            </span>
          </button>
        )}

        {children}
      </form>
    </div>
  );
};
export default AuthForm;
