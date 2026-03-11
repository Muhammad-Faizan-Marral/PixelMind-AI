"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary px-4">
      
      <div className="w-full max-w-md bg-surface-primary border border-surface-secondary rounded-xl p-8 shadow-lg">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-text-secondary">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="example@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-text-secondary">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 bg-surface-secondary border border-surface-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="********"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 transition py-2 rounded-lg font-medium"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}