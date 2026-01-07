import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/menu");
    } catch {
      setError("Email ose password gabim");
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
      <div className="container">
        <h2>Login</h2>

        <form className="card" style={{ padding: "1rem" }} onSubmit={submit}>
          <input
            className="inp"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inp"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="err">{error}</p>}
          <button className="btn btn--primary">Hyr</button>
        </form>

        <p className="muted" style={{ marginTop: ".8rem" }}>
          S'ke llogari? <Link to="/register">Regjistrohu</Link>
        </p>
      </div>
      </section>
    </>
  );
}
