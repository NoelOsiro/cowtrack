import React from "react";

interface SubmitButtonProps {
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
    <div className="mb-5">
        <input
            type="submit"
            value={text}
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
    </div>
);

export default SubmitButton;
