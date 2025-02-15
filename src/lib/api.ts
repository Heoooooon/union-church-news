// lib/api.ts
import { StrapiResponse, Sermon, Church, ChurchResponse, ChurchListResponse, SermonResponse } from '@/types'

const fetchAPI = async <T>(endpoint: string): Promise<StrapiResponse<T>> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${endpoint}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
                },
                next: { revalidate: 3600 }
            }
        );

        if (!res.ok) {
            console.error('API fetch error:', res.status, res.statusText);
            return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
        }

        return res.json();
    } catch (error) {
        console.error('API fetch error:', error);
        return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
    }
};

export const getSermons = () => {
    return fetchAPI<SermonResponse>('/api/posts?populate=*');
};

export const getChurches = () => {
    return fetchAPI<ChurchListResponse>('/api/churches?populate=*');
};

export const getChurch = async (documentId: string) => {
    console.log('Fetching church with documentId:', documentId);
    const response = await fetchAPI<ChurchResponse>(`/api/churches/${documentId}?populate=*`);
    console.log('Church API response:', response);
    return response;
};

export const getChurchSermons = async (documentId: string) => {
    return fetchAPI<SermonResponse>(`/api/posts?filters[church][documentId][$eq]=${documentId}&populate=*`);
};