import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav("/menu");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
      <div className="container">
        <h2>Regjistrohu</h2>

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
          <button className="btn btn--primary">Regjistrohu</button>
        </form>

        <p className="muted" style={{ marginTop: ".8rem" }}>
          Ke llogari? <Link to="/login">Login</Link>
        </p>
      </div>
      </section>
    </>
  );
}
