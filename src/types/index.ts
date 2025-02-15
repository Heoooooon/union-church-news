import { Church, Sermon, ChurchResponse, SermonResponse } from '@/lib/schema';

// src/types/index.ts 전체 리팩토링
export type { 
  Church,
  Sermon,
  ChurchResponse,
  SermonResponse 
} from '@/lib/schema';

// 추가 커스텀 타입이 필요한 경우 확장
export interface ExtendedChurch extends Church {
   // 추가 확장 필드
   memberCount?: number;
   website?: string;
}

// Strapi 공통 응답 타입 (필요시)
export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

// 제네릭 응답 타입 재정의
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}
