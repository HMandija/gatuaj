import { useUi } from "../context/UiContext.jsx";

export default function About() {
  const { tr } = useUi();

  return (
    <section id="rreth" className="section section--soft">
      <div className="container story-grid">
        <article className="story-card story-card--primary">
          <p className="eyebrow">{tr("Historia jone", "Our story")}</p>
          <h2>{tr("Nga ideja ne pjatë", "From idea to plate")}</h2>
          <p className="muted">
            {tr(
              "Gatuaj lindi nga nevoja per ta thjeshtuar gatimin e perditshëm. Jo me receta te komplikuara, jo me kohe te humbur. Vetem ide te qarta, hapa te sakte dhe perberes te fresket, gati per porosi. Ne besojme se gatimi duhet te jete nje kenaqesi, jo nje stres. Prandaj krijuam nje platforme ku shfletimi eshte i lehte, recetat jane te kuptueshme dhe gjithcka qe ju duhet vjen direkt ne deren tuaj.",
              "Gatuaj was born from the need to simplify everyday cooking. No more complicated recipes, no more wasted time. Just clear ideas, exact steps, and fresh ingredients ready to order. We believe cooking should be a pleasure, not a stress—so we built a platform with easy browsing, understandable recipes, and everything you need delivered to your door."
            )}
          </p>
          <a className="text-link" href="#receta">
            {tr("Shiko recetat", "View recipes")}
          </a>
        </article>

        <article className="story-card">
          <div className="story-card__img">
            <img
              alt={tr("Pjatat me perime te fresketa", "Plates with fresh vegetables")}
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
            />
          </div>
          <div className="story-card__body">
            <p className="eyebrow">{tr("Me shume ngjyra", "More color")}</p>
            <h3>{tr("Ngjyra, shije dhe vitamine ne nje pjate", "Color, taste, and vitamins in one plate")}</h3>
            <p className="muted">
              {tr(
                "Ide te shpejta dhe te shendetshme per cdo dite te javes, me hapa te qarte dhe lista te gatshme.",
                "Quick, healthy ideas for every day of the week with clear steps and ready lists."
              )}
            </p>
            <a className="text-link" href="#menu">
              {tr("Porosit mealbox", "Order mealbox")}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
