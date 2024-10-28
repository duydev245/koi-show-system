import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { dashboardApi } from '../../../apis/dashboard.api';
import { Alert, Spin } from 'antd';
import { Pie } from 'react-chartjs-2'; // Import Pie chart
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuantityVariety = () => {

    // dataVariety
    const { data, isLoading, error } = useQuery({
        queryKey: ["dataQuantityVariety"],
        queryFn: () => dashboardApi.getQuantityVariety(),
    });

    const chartData = () => {
        if (!data) return {};

        // Sắp xếp và lấy 4 loài có số lượng cao nhất
        const sortedVarieties = [...data].sort((a, b) => b.quantity - a.quantity);
        const topVarieties = sortedVarieties.slice(0, 4); // Lấy 4 loài cao nhất
        const remainingVarieties = sortedVarieties.slice(4); // Lấy các loài còn lại trong mảng

        const labels = [
            ...topVarieties.map((variety) => variety.varietyName),
            'Others', // Phần gộp cho các loài còn lại
        ];

        const quantities = [
            ...topVarieties.map((variety) => variety.quantity),
            remainingVarieties.reduce((sum, variety) => sum + variety.quantity, 0), // Tổng số lượng các loài còn lại
        ];

        return {
            labels,
            datasets: [
                {
                    label: 'Quantity by Variety',
                    data: quantities,
                    backgroundColor: [
                        'rgba(220, 38, 38, 0.7)', // Màu cho loài 1
                        'rgba(34, 197, 94, 0.7)', // Màu cho loài 2
                        'rgba(34, 144, 255, 0.7)', // Màu cho loài 3
                        'rgba(255, 206, 86, 0.7)', // Màu cho loài 4
                        'rgba(255, 99, 132, 0.7)', // Màu cho Others
                    ],
                },
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quantity Distribution by Variety',
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
                <div style={{ width: '700px' }}>
                    <Pie data={chartData()} options={options} />
                </div>
            )}
        </>
    )
}

export default QuantityVariety