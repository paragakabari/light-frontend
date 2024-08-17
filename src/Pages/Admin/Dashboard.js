import React from "react";
import { Bar, Line,  Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboard.scss";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Define the labels manually
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-dashboard-content">
      <div className="card-outer">
        <div className="card">
          <Bar data={data} options={options} />
          <div>
            <h2>$600000</h2>
            <h4>Sales</h4>
          </div>
        </div>
        <div className="card">
          <Line data={data} options={options} />
          <div>
            <h2>$600000</h2>
            <h4>Margin</h4>
          </div>
        </div>
        <div className="card">
          <PolarArea data={data} options={options} />
          <div>
            <h2>$600000</h2>
            <h4>Order</h4>
          </div>
        </div>

        <div className="card">
          <Radar data={data} options={options} />
          <div>
            <h2>$600000</h2>
            <h4>Customer Satisfaction</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
