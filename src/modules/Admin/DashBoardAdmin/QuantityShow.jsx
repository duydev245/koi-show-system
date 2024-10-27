import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { dashboardApi } from '../../../apis/dashboard.api';
import { Alert, Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const QuantityShow = () => {

    // dataQuantityReg
    const { data, isLoading, error } = useQuery({
        queryKey: ["dataQuantityReg"],
        queryFn: () => dashboardApi.getQuantityRegByShow(),
    });

    const chartData = {
        labels: data?.map((show) => show.showTitle), // Tên các show làm trục x
        datasets: [
            {
                label: 'Total Registrations',
                data: data?.map((show) => show.totalRegistrations), // Số lượng đăng ký làm trục y
                backgroundColor: 'rgba(54, 162, 235, 0.9)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
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
                text: 'Total Registrations for Each Show',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Cho đăng ký là số nguyên
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
                <Bar data={chartData} options={options} />
            )}
        </>
    )
}

export default QuantityShow