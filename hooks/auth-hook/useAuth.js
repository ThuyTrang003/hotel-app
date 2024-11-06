"use client";

import {
    getUserAccount,
    logout,
    signin,
    signup,
} from "../../apis/auth-api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignin = () => {
    return useMutation({ mutationFn: signin });
};
export const useSignup = () => {
    return useMutation({ mutationFn: signup });
};
export const useLogout = () => {
    return useMutation({ mutationFn: logout });
};
export const useGetUserAccount = () => {
    return useQuery({ queryKey: ["getUserAccount"], queryFn: getUserAccount });
};
