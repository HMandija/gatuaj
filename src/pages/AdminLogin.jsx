import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/admin");
    } catch (e2) {
      setErr("Email ose password gabim");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2>Admin Access</h2>

        <form className="card" style={{ padding: "1rem" }} onSubmit={submit}>
          <input
            className="inp"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inp"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <p className="err">{err}</p>}

          <button className="btn btn--primary" type="submit">
            Hyr
          </button>
        </form>
      </div>
    </section>
  );
}
