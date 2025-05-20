import type { ReactNode } from "react";
import { useInputContainerContext } from "./context";

export function Label({ children }: { children: ReactNode }) {
	const ctx = useInputContainerContext();
	return (
		<label
			htmlFor={ctx.id}
			className="text-xs text-gray-500 leading-xs uppercase peer-focus:text-blue-base peer-focus:font-bold"
		>
			{children}
		</label>
	);
}
