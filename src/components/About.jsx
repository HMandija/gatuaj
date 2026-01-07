export default function About() {
  return (
    <section id="rreth" className="section section--soft">
      <div className="container story-grid">
        <article className="story-card story-card--primary">
          <p className="eyebrow">Historia jone</p>
          <h2>Nga ideja ne pjatë</h2>
          <p className="muted">
            Gatuaj lindi nga nevoja per ta thjeshtuar gatimin e perditshëm. Jo
            me receta te komplikuara, jo me kohe te humbur. Vetem ide te qarta,
            hapa te sakte dhe perberes te fresket, gati per porosi. Ne besojme
            se gatimi duhet te jete nje kenaqesi, jo nje stres. Prandaj krijuam
            nje platforme ku shfletimi eshte i lehte, recetat jane te kuptueshme
            dhe gjithcka qe ju duhet vjen direkt ne deren tuaj.
          </p>
          <a className="text-link" href="#receta">
            Shiko recetat
          </a>
        </article>

        <article className="story-card">
          <div className="story-card__img">
            <img
              alt="Pjatat me perime te fresketa"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
            />
          </div>
          <div className="story-card__body">
            <p className="eyebrow">Me shume ngjyra</p>
            <h3>Ngjyra, shije dhe vitamine ne nje pjate</h3>
            <p className="muted">
              Ide te shpejta dhe te shendetshme per cdo dite te javes, me hapa
              te qarte dhe lista te gatshme.
            </p>
            <a className="text-link" href="#menu">
              Porosit mealbox
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
