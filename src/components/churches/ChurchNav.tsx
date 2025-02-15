// components/churches/ChurchNav.tsx
'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Church , Sermon} from '@/types'
import { SermonList } from '../posts/SermonList'

interface ChurchNavProps {
  churches: Church[]
  sermons: Sermon[]  // 모든 설교 데이터 추가
}

export function ChurchNav({ churches, sermons }: ChurchNavProps) {
  const [selectedChurch, setSelectedChurch] = useState<string | null>(null);

  return (
    <>
      {selectedChurch && (
        <div className="mb-16">  {/* 하단 네비게이션 위의 여백 */}
          <SermonList 
            sermons={sermons} 
            churchId={selectedChurch} 
          />
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white pb-4 pt-2 shadow-lg">
        <Swiper
          spaceBetween={20}
          slidesPerView={4.6}
          className="px-4"
        >
          {churches.map((church) => (
            <SwiperSlide key={church.id}>
              <button
                onClick={() => setSelectedChurch(church.documentId)}
                className={`w-full ${selectedChurch === church.documentId ? 'opacity-100' : 'opacity-70'}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">
                      {church.name[0]}
                    </span>
                  </div>
                  <p className="text-sm text-center font-medium line-clamp-1">
                    {church.name}
                  </p>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}