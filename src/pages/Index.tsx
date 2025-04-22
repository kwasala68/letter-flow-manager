import { Navigate } from 'react-router-dom';

const Index = () => {
  // Simply redirect to dashboard which will handle auth
  return <Navigate to="/dashboard" replace />;
};

export default Index;
