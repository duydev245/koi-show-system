import React from 'react'
import { dashboardApi } from '../../../apis/dashboard.api';
import { Alert, Spin } from 'antd';
import { Line  } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const RevenueShow = () => {

    // dataRevenue
    const { data, isLoading, error } = useQuery({
        queryKey: ["dataRevenue"],
        queryFn: () => dashboardApi.getRevenue(),
    });

    const chartData = {
        labels: data?.map((show) => show.showTitle), // Tên các show làm trục x
        datasets: [
            {
                label: 'Total Revenue',
                data: data?.map((show) => show.totalRevenue), // Doanh thu làm trục y
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue of Each Show',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value.toLocaleString()} VND`,
                },
            },
        },
    };

    if (error) {
        return (
            <Alert
                message="Warning"
                description="Something went wrong..."
                type="warning"
                showIcon
            />
        );
    }

    return (
        <>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <Spin size="large" spinning />
                </div>
            ) : (
                <Line data={chartData} options={options} />
            )}
        </>
    )
}

export default RevenueShow