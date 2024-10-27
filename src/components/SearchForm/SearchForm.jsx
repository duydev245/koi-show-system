import { Form, Input } from 'antd';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SearchForm = ({ handleSearch }) => {
    const schema = yup.object({
        searchValue: yup
            .string()
            .trim()
            .required("*SearchValue is required!"),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            searchValue: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {
        const payload = {
            keyword: values.searchValue,
        }
        // console.log("🚀 ~ onSubmit ~ payload:", payload)
        handleSearch(payload)
    }

    return (
        <Form className="w-3/5 mx-auto mb-5" onFinish={handleSubmit(onSubmit)}>
            <div className='relative' id='searchBar'>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>

                <Controller
                    name="searchValue"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                {...field}
                                type="search"
                                size='large'
                                className="block w-full p-4 ps-10 text-base text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-100"
                                placeholder="Please enter to search here..."
                                status={errors.searchValue ? "error" : ""}
                            />
                        );
                    }}
                />

                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:text-black font-medium rounded-lg text-base px-4 py-2 duration-300">Search</button>
            </div>
        </Form>
    )
}

export default SearchForm
