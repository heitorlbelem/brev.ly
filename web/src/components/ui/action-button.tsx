import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ElementType;
	children?: ReactNode;
}

export function ActionButton({
	icon: Icon,
	children,
	...props
}: ActionButtonProps) {
	return (
		<button
			type="button"
			className="p-2 flex items-center gap-1.5 bg-gray-200 text-gray-500 rounded-sm hover:cursor-pointer hover:not-[disabled]:outline-2 hover:not-[disabled]:outline-blue-base disabled:opacity-50 disabled:outline-none disabled:cursor-not-allowed"
			{...props}
		>
			{Icon && <Icon className="text-gray-600" />}
			{children && (
				<span className="text-sm leading-sm font-semibold">{children}</span>
			)}
		</button>
	);
}
