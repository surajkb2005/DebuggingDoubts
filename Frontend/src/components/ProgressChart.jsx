import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

/* REGISTER ONCE */
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function ProgressChart({ dataPoints }) {

    const data = {
        labels: dataPoints.map(d => d.date),
        datasets: [
            {
                label: "Videos Watched",
                data: dataPoints.map(d => d.count),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                tension: 0.4,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
                Learning Progress
            </h2>

            <Line data={data} options={options} />
        </div>
    );
}