

const AdminLayout = ({ children }) => {
  const cookies = localStorage.getItem('role');
  const isAuthenticated =
    cookies ==='admin' 

  if (isAuthenticated) return children;

  // return <Navigate to="/login" />;
  return (window.location.href = '/admin');
};

export default AdminLayout;
