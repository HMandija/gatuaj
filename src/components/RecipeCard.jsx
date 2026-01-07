export default function RecipeCard({ item }) {
  return (
    <article className="card card--lift">
      <div className="card__img">
        <img src={item.image} alt={item.title} />
        <span className="pill pill--accent">{item.tag}</span>
      </div>
      <div className="card__body">
        <h3>{item.title}</h3>
        <p className="muted">{item.excerpt}</p>
        <a className="text-link" href="#kontakt">
          Lexo me shume
        </a>
      </div>
    </article>
  );
}
