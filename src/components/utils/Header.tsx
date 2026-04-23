import { toast } from "sonner";
import { logout } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/middlwere/hooks";

const Header = () => {

  const dispatch=useAppDispatch();


  const handleLogout=()=>{

    dispatch(logout())
    toast.success('Logut Success')


  }
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      
      {/* Left (Logo) */}
      <h1 className="text-xl font-bold text-gray-800">
        PH Management
      </h1>

      {/* Right (User + Logout) */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Animes</span>

        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;