import { useFormik } from "formik";
import * as Yup from "yup";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useSignInFormik = () => {
    const router = useRouter();
    const supabase = createClient();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        }),
        onSubmit: async (values) => {
            const { email, password } = values;
            try {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                toast.success("Successfully logged in!", { position: "top-center", autoClose: 3000 });
                router.push("/");
            } catch (error: any) {
                toast.error(`Login error: ${error.message}`, { position: "top-center", autoClose: 3000 });
            }
        },
    });

    return formik;
};

export default useSignInFormik;
