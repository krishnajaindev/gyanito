
import Header from "./shared/components/Header.tsx";
import AppRoutes from "../src/shared/routes/AppRoutes.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-[url('./assets/bg.jpg')] bg-no-repeat bg-center bg-cover min-h-screen overflow-hidden">
        <Header />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;