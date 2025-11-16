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
    <form
      action={formAction}
      className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6 text-red-50"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">{titre}</h2>
      {!showName ? (
        ""
      ) : (
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fld_name"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="fld_name"
            name="name"
            required
            placeholder="Entrez votre nom"
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-600 focus:outline-none"
          />
        </div>
      )}

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="fld_email"
        >
          Adresse courriel
        </label>
        <input
          type="email"
          id="fld_email"
          name="email"
          autoComplete="email"
          required
          placeholder="exemple@email.com"
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-600 focus:outline-none"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="fld_password"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="fld_password"
          placeholder="********"
          name="password"
          required
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-600 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        {callActionTitre}
      </button>

      {children}
    </form>
  );
};
export default AuthForm;
