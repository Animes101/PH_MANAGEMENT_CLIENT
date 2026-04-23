import { useState } from "react";
import { useLoginMutation } from "../redux/fetures/auth/authApi";
import { useAppDispatch } from "../redux/middlwere/hooks";
import { setUser } from "../redux/fetures/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


type TJwtPayload = {
  userId: string;
  userRole: string;
  iat?: number;
  exp?: number;
};

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");

  const navigate=useNavigate()

const [login] = useLoginMutation();
const dispatch = useAppDispatch();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const loginData = {
    body: {
      id: userId,
      password,
    },
  };

  try {
    const res = await login(loginData).unwrap();

    const token = res?.data?.accessToken;

    const userDecod = jwtDecode<TJwtPayload>(token);

    const user = {
      id: userDecod.userId,
      role: userDecod.userRole,
    };

    dispatch(
      setUser({
        user,
        accessToken: token,
      })
    );

    toast.success("Login Success");
    navigate(`/${user.role}/dashboard`);
  } catch (err: any) {
    
    // backend message show
    const message =
      err?.data?.message || "Login Failed ❌";

    toast.error(message);
  }
};


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