import "./dashboard.scss";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="admin-dashboard-content">
        <div className="card-outer">
          <div className="card">
            <h2>$600000</h2>
            <h4>Sales</h4>
          </div>
          <div className="card">
            <h2>$600000</h2>
            <h4>Margin</h4>
          </div>
          <div className="card">
            <h2>$600000</h2>
            <h4>Order</h4>
          </div>
          <div className="card">
            <h2>$600000</h2>
            <h4>Quantity Returned</h4>
          </div>
          
        </div>
      </div>
    </div>
  );
}
