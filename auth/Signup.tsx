import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ページのリフレッシュを防ぐ
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        alert("登録成功: " + userCredential.user.email);
      })
      .catch((error) => {
        alert("エラー: " + error.message);
      });
  };

  return (
    <form>
      <input type="email" placeholder="e-mail入力" onChange={handleEmail} />
      <input type="password" placeholder="pass入力" onChange={handlePass} />
      <button onClick={handleSubmit}>送信</button>
      <Link to="/">戻る</Link>
    </form>
  );
};

export default SignUp;
