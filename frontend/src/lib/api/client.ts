import { getSession } from 'next-auth/react';
import { BACKEND_URL } from '../constants';

export class ApiError extends Error {
  constructor(public status: number, public statusText: string, public data?: any) {
    super(statusText);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const session = await getSession();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (session?.backendTokens?.accessToken) {
      headers['Authorization'] = `Bearer ${session.backendTokens.accessToken}`;
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 - token might be expired, try to refresh
      if (response.status === 401 && endpoint !== '/auth/refresh') {
        throw new ApiError(401, 'Unauthorized');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(response.status, response.statusText, data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(500, 'Network error', { message: error.message });
      }

      throw new ApiError(500, 'Network error', { message: String(error) });
    }
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(BACKEND_URL);
