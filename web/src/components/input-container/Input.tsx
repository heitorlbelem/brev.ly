import type { InputHTMLAttributes } from "react";
import { useInputContainerContext } from "./context";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	const ctx = useInputContainerContext();
	return (
		<div className="relative">
			{ctx.prefix && (
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-md leading-md">
					{ctx.prefix}
				</span>
			)}
			<input
				id={ctx.id}
				className={`peer w-full border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-2 ${ctx.hasError ? "focus:outline-danger outline-2 outline-danger" : "focus:outline-blue-base"} placeholder:text-gray-400 ${ctx.prefix ? "pl-[60px]" : ""}`}
				{...props}
			/>
		</div>
	);
}
