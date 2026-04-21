import { useState } from "react";
import { useAppDispatch } from "../redux/middlwere/hooks";
import { useLoginMutation } from "../redux/fetures/auth/authApi";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");

  const [login, {data, error}]=useLoginMutation();




  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // API / Redux logic here

    const loginData={
      body:{
        id:userId,
          password
      }
    }

    login(loginData)

    console.log(error)
    console.log(loginData)

  };

  console.log(data)

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Reset link sent to:", email);

    // API call for reset password

    setEmail("");
    setShowForgot(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          {showForgot ? "Forgot Password" : "Login"}
        </h2>

        {!showForgot ? (
          <form onSubmit={handleLogin} className="space-y-4">

            {/* User ID */}
            <div>
              <label className="block text-sm font-medium mb-1">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Send Reset Link
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;