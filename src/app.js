import { useAuth } from './hooks/auth';  
import AuthRoutes from "./routes/auth.routes";
import DefaultRoutes from "./routes/default.routes";


const App = () => {
  const { logged } = useAuth();
  if(logged){
    return(
      <DefaultRoutes />
    )
  }else{
    return(
      <AuthRoutes />
    )
  };
};

export default App