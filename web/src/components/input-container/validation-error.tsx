import { Warning } from "phosphor-react";

interface ValidationErrorProps {
	message: string;
}

export function ValidationError({ message }: ValidationErrorProps) {
	return (
		<div className="flex items-center gap-2">
			<Warning size={16} className="text-danger" />
			<span className="text-gray-500 text-sm leading-sm">{message}</span>
		</div>
	);
}
