import type { ReactNode } from "react";
import { useInputContainerContext } from "./context";

export function Label({ children }: { children: ReactNode }) {
	const ctx = useInputContainerContext();
	return (
		<label
			htmlFor={ctx.id}
			data-has-error={ctx.hasError}
			className={`${ctx.hasError ? "text-danger" : "text-gray-500"} font-bold text-xs leading-xs uppercase`}
		>
			{children}
		</label>
	);
}
