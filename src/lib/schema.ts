// src/lib/schema.ts
import { z } from 'zod';

// 기본 필드 스키마
const BaseChurchSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  worshipSchedule: z.string().optional(),
  email: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  description: z.string().optional(),
  isVisible: z.boolean().default(true),
  address: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  images: z.any().nullable()
});

// API 응답 구조 검증
export const ChurchResponseSchema = z.object({
  data: BaseChurchSchema,
  meta: z.record(z.any())
});

export const ChurchListResponseSchema = z.object({
  data: BaseChurchSchema.array(),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number()
    })
  })
});

// 타입 자동 생성
export type Church = z.infer<typeof BaseChurchSchema>;
export type ChurchResponse = z.infer<typeof ChurchResponseSchema>;
export type ChurchListResponse = z.infer<typeof ChurchListResponseSchema>;

// Base Sermon 스키마 추가
const BaseSermonSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  content: z.array(
    z.object({
      type: z.string(),
      children: z.array(
        z.object({
          type: z.string(),
          text: z.string()
        })
      )
    })
  ),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  publishedDate: z.string(),
  isPublic: z.boolean(),
  author: z.string(),
  files: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      url: z.string(),
      mime: z.string(),
      documentId: z.string()
    })
  ),
  category: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    documentId: z.string()
  }),
  church: z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    documentId: z.string()
  })
});

// Sermon 응답 스키마 추가
export const SermonResponseSchema = z.object({
  data: BaseSermonSchema,
  meta: z.record(z.any())
});

export const SermonListResponseSchema = z.object({
  data: BaseSermonSchema.array(),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number()
    })
  })
});

// 타입 재생성
export type Sermon = z.infer<typeof BaseSermonSchema>;
export type SermonResponse = z.infer<typeof SermonResponseSchema>;
export type SermonListResponse = z.infer<typeof SermonListResponseSchema>;