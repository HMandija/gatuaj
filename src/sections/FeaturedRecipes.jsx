import RecipeCard from "../components/RecipeCard.jsx";
import { recipes } from "../data/recipes.js";

export default function FeaturedRecipes() {
  return (
    <section id="receta" className="section section--soft">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Te reja</p>
            <h2>Recetat kryesore</h2>
            <p className="muted">Zgjidh nje ide dhe nis gatimin sot.</p>
          </div>
          <a className="text-link" href="#kontakt">
            Kontakto
          </a>
        </div>

        <div className="grid grid--3">
          {recipes.map((r) => (
            <RecipeCard key={r.id} item={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
