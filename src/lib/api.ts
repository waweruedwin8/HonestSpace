// Generic API client for Django backend
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        data,
        status: response.status,
        message: data.message,
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string, userType: 'tenant' | 'landlord' = 'tenant') {
    return this.request<{ access: string; refresh: string; user: any }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password, user_type: userType }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    userType: 'tenant' | 'landlord';
  }) {
    return this.request<{ access: string; refresh: string; user: any }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        user_type: userData.userType,
      }),
    });
  }

  async googleLogin(token: string, userType: 'tenant' | 'landlord' = 'tenant') {
    return this.request<{ access: string; refresh: string; user: any }>('/auth/google/', {
      method: 'POST',
      body: JSON.stringify({ token, user_type: userType }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request<{ access: string }>('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await this.request('/auth/logout/', {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
      });
    }
    this.setToken(null);
    localStorage.removeItem('refresh_token');
  }

  async getProfile() {
    return this.request<any>('/users/profile/');
  }

  // Property endpoints
  async getProperties(params?: {
    search?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    amenities?: string[];
    page?: number;
    pageSize?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v.toString()));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }

    const queryString = searchParams.toString();
    return this.request<PaginatedResponse<any>>(`/properties/${queryString ? `?${queryString}` : ''}`);
  }

  async getProperty(id: string) {
    return this.request<any>(`/properties/${id}/`);
  }

  async createProperty(propertyData: any) {
    return this.request<any>('/properties/', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id: string, propertyData: any) {
    return this.request<any>(`/properties/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id: string) {
    return this.request<void>(`/properties/${id}/`, {
      method: 'DELETE',
    });
  }

  // Love/Bookmark endpoints
  async getLikedProperties() {
    return this.request<any[]>('/users/loved-properties/');
  }

  async toggleLike(propertyId: string) {
    return this.request<{ liked: boolean }>(`/properties/${propertyId}/love/`, {
      method: 'POST',
    });
  }

  // Reviews endpoints
  async getPropertyReviews(propertyId: string) {
    return this.request<any[]>(`/properties/${propertyId}/reviews/`);
  }

  async createReview(propertyId: string, reviewData: any) {
    return this.request<any>(`/properties/${propertyId}/reviews/`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Scout endpoints
  async submitScoutApplication(applicationData: any) {
    return this.request<any>('/scout/applications/', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getScoutApplicationStatus(applicationId: string) {
    return this.request<any>(`/scout/applications/${applicationId}/`);
  }

  // File upload
  async uploadFile(file: File, type: 'property' | 'review' | 'document') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/upload/`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    return { data, status: response.status };
  }
}

export const apiClient = new ApiClient();