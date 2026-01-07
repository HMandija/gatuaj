export default function Steps() {
  return (
    <section className="section">
      <div className="container two-col">
        <div className="image-card">
          <img
            alt="Perime"
            src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1400&q=80"
          />
        </div>

        <div>
          <p className="eyebrow">Procesi</p>
          <h2>Perberes te fresket dhe receta me te mira</h2>
          <div className="timeline">
            <div className="timeline__item">
              <div className="timeline__n">01</div>
              <div>
                <strong>Zgjidh menune</strong>
                <p className="muted">Zgjidh receten ose mealbox-in qe te pelqen.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__n">02</div>
              <div>
                <strong>Porosit</strong>
                <p className="muted">Vendos porosine (simulim) dhe mbaj shenime per adresen.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__n">03</div>
              <div>
                <strong>Shijo</strong>
                <p className="muted">Merr perberes te fresket dhe udhezime te sakta, pa stres.</p>
              </div>
            </div>
          </div>

          <a className="text-link" href="/menu">
            Porosit tani
          </a>
        </div>
      </div>
    </section>
  );
}
