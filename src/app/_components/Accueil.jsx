"use client";
import './Accueil.css';

const Accueil = () => {
    return (

        <div className="container">
            <div className='header-background'>
            <div className="nav">
                <img className='logo' src="/svg/logo.svg" alt="" />
                <button className="createBtn">Créer</button>
            </div>
            <section className="hero">
                <h1 className="heroTitle">
                    L’ART DE RACONTER, RÉINVENTÉ.<br />
                    ICI, LA CRÉATIVITÉ PREND<br />
                    TOUTES LES FORMES.
                </h1>
                <button className="heroCta">Créer  →</button>
            </section>
            </div>

            <section className="info">
                <div className="infoLeft">
                    <div>
                        <em>Créez</em> des récits interactifs,<br />
                        <em>explorez</em> ceux des autres et<br />
                        <em>partagez</em> vos créations en<br />
                        quelques clics.
                    </div>
                </div>
                <div className="infoRight">
                    <img src="" alt="" />
                </div>
            </section>
        </div>
    );
};

export default Accueil;
