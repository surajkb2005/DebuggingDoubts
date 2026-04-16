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

    if (!dataPoints || dataPoints.length === 0) return null;

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
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
                Learning Progress
            </h2>
            <div className="w-full overflow-x-auto">
                <div className="w-full h-[300px] relative">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
}