import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Categories from "../components/Categories.jsx";
import FeaturedRecipes from "../sections/FeaturedRecipes.jsx";
import CTA from "../components/CTA.jsx";
import Steps from "../components/Steps.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="section">
        <div className="container strip">
          <div className="strip__item">
            <span className="eyebrow">Fruta & perime</span>
            <strong>03</strong>
            <p className="muted">Receta te fresketa dhe stinore per cdo dite.</p>
          </div>
          <div className="strip__item">
            <span className="eyebrow">Menu</span>
            <strong>15+</strong>
            <p className="muted">Ide sezonale, bazike dhe Mealbox ne nje vend.</p>
          </div>
          <div className="strip__item">
            <span className="eyebrow">Lexo</span>
            <strong>Blog</strong>
            <p className="muted">Artikuj dhe guida te shpejta per kuzhinen ne shtepi.</p>
          </div>
        </div>
      </section>
      <About />
      <Categories />
      <FeaturedRecipes />
      <CTA />
      <Steps />
      <Testimonials />
      <Footer />
    </>
  );
}
