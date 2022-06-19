import { useState } from "react";

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