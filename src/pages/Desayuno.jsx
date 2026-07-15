import { Navigate } from 'react-router-dom';

function Desayuno() {
  return <Navigate to="/menu?type=desayuno" replace />;
}

export default Desayuno;
