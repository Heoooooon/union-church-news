// components/posts/SermonList.tsx
'use client'
import { Card } from '@/components/ui/card'
import { Sermon } from '@/types'
import { useState } from 'react';
import { PDFViewer } from '@/components/common/PDFViewer';


interface SermonListProps {
  sermons: Sermon[]
  churchId?: string  // 교회 ID 추가
}

export function SermonList({ sermons, churchId }: SermonListProps) {

  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  // 특정 교회의 설교만 필터링 (churchId가 있는 경우)
  const filteredSermons = churchId 
    ? sermons.filter(sermon => sermon.church.documentId === churchId)
    : sermons;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredSermons.map((sermon) => (
        <Card key={sermon.id} className="p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">
            {sermon.title}
          </h3>
          <div className="text-sm text-gray-600">
            <p className="mb-1">{sermon.author}</p>
            <div className="flex justify-between items-center">
              <span>{sermon.church.name}</span>
              <span>
                {new Date(sermon.publishedDate).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
          {sermon.files.length > 0 && (
            <div className="mt-3">
              <a 
                href={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${sermon.files[0].url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                PDF 보기
              </a>
            </div>
          )}
          {sermon.files.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => setSelectedSermon(sermon)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  설교문 보기
                </button>
              </div>
            )}
        </Card>
      ))}
      {/* PDF 뷰어 모달 */}
      {selectedSermon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedSermon.title}</h3>
              <button
                onClick={() => setSelectedSermon(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <PDFViewer 
                url={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${selectedSermon.files[0].url}`}
                title={selectedSermon.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}