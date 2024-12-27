/*
    Unified interface for network calls with the TMDB API.
    Manages adding the auth token, headers, etc, making the request and parsing the response,
*/

// API configuration and request handling
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3';
const authKey = process.env.EXPO_PUBLIC_AUTH_KEY;

export interface Request<T = unknown> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: T;
    params?: Record<string, string>;
    multipart?: FormData;
}

export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

export async function makeRequest<T>(request: Request): Promise<T> {
    if (!authKey) {
        console.error('API Key is missing. Please check your environment configuration.');
        throw new ApiError('API configuration is missing', 401, null);
    }

    const url = new URL(`${baseUrl}${request.url}`);

    if (request.params) {
        Object.entries(request.params).forEach(([key, value]) =>
            url.searchParams.append(key, value)
        );
    }

    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authKey}`,
        'Content-Type': 'application/json'
    };

    const config: RequestInit = {
        method: request.method,
        headers: headers
    };

    if (request.multipart) {
        config.body = request.multipart;
    } else if (request.data) {
        config.body = JSON.stringify(request.data);
    }

    try {
        console.log(`Making API request to: ${url.toString()}`);
        const response = await fetch(url.toString(), config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            });
            throw new ApiError(
                errorData?.message || `HTTP error! status: ${response.status}`,
                response.status,
                errorData
            );
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error('Network Error:', error);
        
        if (error instanceof ApiError) {
            throw error;
        }
        if (error instanceof Error) {
            throw new ApiError(error.message, 0, null);
        }
        throw new ApiError('An unknown error occurred', 0, null);
    }
}

// Helper function to generate the image URL
export const image = (path: string): string => `https://image.tmdb.org/t/p/original${path}`;

// Helper function to format the release date
export const formatReleaseDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};