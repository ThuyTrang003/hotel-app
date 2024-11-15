"use client";

import {
    getIsAuthorization,
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
export const useGetIsAuthorization = () => {
    return useMutation({ mutationFn: getIsAuthorization });
};
