export default function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <div className="container footer__grid">
        <div>
          <div className="brand brand--footer">
            <img
              className="brand__logo"
              src="public\logo.png-removebg-preview.png"
              alt="Gatuaj logo"
            />
          </div>
          <p className="muted">
            Prototip per projekt master (e-business / e-commerce).
          </p>
        </div>

        <div>
          <strong>Menu</strong>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#receta">Receta</a>
            <a href="#rreth">Rreth Nesh</a>
          </div>
        </div>

        <div>
          <strong>Kontakt</strong>
          <div className="footer__links">
            <a href="mailto:demo@gatuaj.al">demo@gatuaj.al</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom muted">
        © {new Date().getFullYear()} Gatuaj. Te gjitha te drejtat.
      </div>
    </footer>
  );
}
