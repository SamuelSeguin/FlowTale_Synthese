import "./AuthForm.css";

const AuthForm = ({
  titre,
  callActionTitre,
  showName,
  formAction,
  children,
}) => {
  console.log(formAction);
  return (
    <div className="form-background">
      <form cl action={formAction} className="auth-form">
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
              placeholder="Entrez votre nom"
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

        {children}
      </form>
    </div>
  );
};
export default AuthForm;
