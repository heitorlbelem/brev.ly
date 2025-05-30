import type { ReactNode } from "react";
import {
	InputContainerContext,
	type InputContainerContextProps,
} from "./context";

export function Root({
	id,
	prefix,
	children,
	hasError = false,
}: InputContainerContextProps & { children: ReactNode }) {
	return (
		<InputContainerContext.Provider value={{ id, prefix, hasError }}>
			<div className="input-wrapper flex flex-col gap-2">{children}</div>
		</InputContainerContext.Provider>
	);
}
