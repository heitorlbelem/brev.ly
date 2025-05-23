import { api } from "../lib/axios";

export interface GenerateReportResponse {
	reportUrl: string;
}

export async function generateReport() {
	const response = await api.post<GenerateReportResponse>(
		"/shortened-urls/export",
	);
	return response.data;
}
