
import apiClient from "./client";


export interface CreateMailCollectorRequest {
    email: string;
    purpose?: "NEWS_LETTER" | "EARLY_ACCESS"; // or: 'NEWS_LETTER' | 'EARLY_ACCESS'
}

export const collectMail = async (
    data: CreateMailCollectorRequest
): Promise<boolean> => {
    const response = await apiClient.post('/utils/mail-collector', data);

    if (response.status === 201) {
        return true
    } else {
        return false
    }
};
