'use client'
import React from "react";
import * as Yup from "yup";
import Link from "next/link";
import FormContainer from "../FormElements/FormContainer";
import InputField from "../FormElements/Inputs/Input";
import PasswordInputField from "../FormElements/Inputs/PasswordInput";
import SubmitButton from "../FormElements/Buttons/Submit";
import useSignInFormik from "@/src/hooks/useSignInFormik";

const SignInForm = () => {
    const formik = useSignInFormik();

    return (
        <FormContainer>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />
                <PasswordInputField
                    name="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />
                <SubmitButton text="Sign In" />
                <div className="mt-6 text-center">
                    <p>
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-primary">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    );
};

export default SignInForm;
