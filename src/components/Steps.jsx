import { useUi } from "../context/UiContext.jsx";

export default function Steps() {
  const { tr } = useUi();

  return (
    <section className="section">
      <div className="container two-col">
        <div className="image-card">
          <img
            alt={tr("Perberes te fresket", "Fresh ingredients")}
            src="/fresh.ingredients.jpeg"
          />
        </div>

        <div>
          <p className="eyebrow">{tr("Procesi", "Process")}</p>
          <h2>
            {tr(
              "Perberes te fresket dhe receta me te mira",
              "Fresh ingredients and better recipes"
            )}
          </h2>
          <div className="timeline">
            <div className="timeline__item">
              <div className="timeline__n">01</div>
              <div>
                <strong>{tr("Zgjidh menune", "Choose your menu")}</strong>
                <p className="muted">
                  {tr(
                    "Zgjidh receten ose mealbox-in qe te pelqen.",
                    "Pick the recipe or mealbox you like."
                  )}
                </p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__n">02</div>
              <div>
                <strong>{tr("Porosit", "Order")}</strong>
                <p className="muted">
                  {tr(
                    "Vendos porosine (simulim) dhe mbaj shenime per adresen.",
                    "Place the order (demo) and note your address."
                  )}
                </p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__n">03</div>
              <div>
                <strong>{tr("Shijo", "Enjoy")}</strong>
                <p className="muted">
                  {tr(
                    "Merr perberes te fresket dhe udhezime te sakta, pa stres.",
                    "Get fresh ingredients and clear steps, stress free."
                  )}
                </p>
              </div>
            </div>
          </div>

          <a className="text-link" href="/menu">
            {tr("Porosit tani", "Order now")}
          </a>
        </div>
      </div>
    </section>
  );
}
