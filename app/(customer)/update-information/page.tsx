"use client";

import { useEffect, useState } from "react";

import RestClient from "@/features/room/utils/api-function";

const UpdateInformation = () => {
    const [formData, setFormData] = useState({
        password: "",
        fullName: "",
        gender: "",
        birthDate: "",
        phoneNumber: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserFromLocalStorage = () => {
            const userAccount = localStorage.getItem("userAccount");
            if (userAccount) {
                const parsedAccount = JSON.parse(userAccount);
                const userId = parsedAccount.state.userAccount.id;
                fetchCustomerFullName(userId);
            }
        };

        fetchUserFromLocalStorage();
    }, []);

    const fetchCustomerFullName = async (userId: string) => {
        const client = new RestClient();
        try {
            const customer = await client.service("customers").get(userId);

            if (customer) {
                setFormData({
                    fullName: customer.fullName || "",
                    gender: customer.gender || "",
                    birthDate: customer.birthDate
                        ? customer.birthDate.split("T")[0]
                        : "",
                    phoneNumber: customer.phoneNumber || "",
                    password: "",
                });
            } else {
                console.error("Customer data is invalid");
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const client = new RestClient();
        const userAccount = localStorage.getItem("userAccount");
        let parsedAccount = null;
        if (userAccount) {
            parsedAccount = JSON.parse(userAccount);
        }
        const userId = parsedAccount.state.userAccount.id;

        if (!userId) {
            setMessage("User ID not found.");
            return;
        }
        try {
            await client.service("customers").update(userId, formData);
            setMessage("Information updated successfully!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error updating information:", error);
            setMessage(error?.message || "Failed to update information.");
        }
    };

    return (
        <div className="mx-auto mt-20 max-w-lg rounded-lg border border-gray-200 bg-white px-6 py-16 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Update Your Information
            </h1>
            {message && (
                <div className="mb-6 rounded bg-blue-100 p-4 text-center text-blue-800">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="birthDate"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Birth Date
                    </label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter a new password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateInformation;
