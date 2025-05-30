import { createContext, useContext } from "react";

export interface InputContainerContextProps {
	id: string;
	prefix?: string;
	hasError: boolean;
}

export const InputContainerContext = createContext<
	InputContainerContextProps | undefined
>(undefined);

export function useInputContainerContext() {
	const ctx = useContext(InputContainerContext);
	if (!ctx)
		throw new Error("InputContainer.* must be used within InputContainer.Root");
	return ctx;
}
