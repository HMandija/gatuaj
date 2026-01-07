import { testimonials } from "../data/testimonials.js";

export default function Testimonials() {
  const [first, ...rest] = testimonials;

  return (
    <section className="section section--soft">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Feedback</p>
            <h2>Thone per ne</h2>
            <p className="muted">Klientet qe kane provuar recetat dhe mealbox-et tona.</p>
          </div>
        </div>

        <div className="testimonial-grid">
          {first && (
            <article className="tcard tcard--hero">
              <div className="tcard__head">
                <img className="avatar" src={first.avatar} alt={first.name} />
                <div>
                  <strong>{first.name}</strong>
                  <div className="muted">Klient</div>
                </div>
              </div>
              <p className="tcard__quote">“{first.text}”</p>
              <div className="tcard__actions">
                <span className="pill pill--soft">Receta + Mealbox</span>
                <span className="pill pill--soft">Gatuaj ne shtepi</span>
              </div>
            </article>
          )}

          <div className="tcard__list">
            {rest.map((t) => (
              <article key={t.id} className="tcard">
                <div className="tcard__head">
                  <img className="avatar" src={t.avatar} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <div className="muted">Klient</div>
                  </div>
                </div>
                <p className="muted">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
