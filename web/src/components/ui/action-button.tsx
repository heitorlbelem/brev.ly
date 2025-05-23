import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
}

export function ActionButton({ children, ...props }: ActionButtonProps) {
	return (
		<button
			type="button"
			className="p-2 flex items-center gap-1.5 bg-gray-200 text-gray-500 rounded-sm hover:cursor-pointer hover:not-[disabled]:outline-2 hover:not-[disabled]:outline-blue-base disabled:opacity-50 disabled:outline-none disabled:cursor-not-allowed"
			{...props}
		>
			<p className="flex gap-1.5 text-sm leading-sm font-semibold text-gray-400">
				{children}
			</p>
		</button>
	);
}
