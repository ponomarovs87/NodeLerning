import { FC, useContext, useState } from "react";
import { Context } from "../main";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div>
      <input
        type="text"
        placeholder="enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="enter your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        onClick={() => {
          store.login(email, password);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          store.registration(email, password);
        }}
      >
        Registration
      </button>
    </div>
  );
};
