"use client";

import { logout, signin, signup } from "../../apis/auth-api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignin = () => {
    return useMutation({ mutationFn: signin });
};
export const useSignup = () => {
    return useMutation({ mutationFn: signup });
};
export const useLogout = () => {
    return useQuery({ queryKey: ["logout"], queryFn: logout });
};
