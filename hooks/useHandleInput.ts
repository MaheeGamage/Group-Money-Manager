import { useState } from "react";

// Hook that allow to capture the input value and set it to the state
export const useHandleInput = (initValue: string) => {
    const [value, setValue] = useState(initValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value: value,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
            }
        }
    }
};