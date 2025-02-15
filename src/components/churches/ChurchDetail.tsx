// components/churches/ChurchDetail.tsx
import { Church } from '@/types'

interface ChurchDetailProps {
    church: Church
}

export function ChurchDetail({ church }: ChurchDetailProps) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="aspect-[21/9] relative mb-6 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-4xl font-bold text-gray-600">
          {church.name[0]}
        </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{church.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="font-semibold text-xl mb-4">교회 정보</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>주소:</strong> {church.address}</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-xl mb-4">예배 시간</h2>
                    <div className="prose prose-sm max-w-none">
                        {church.worshipSchedule}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-xl mb-4">교회 소개</h2>
                <div className="prose max-w-none">
                    {church.description}
                </div>
            </div>
        </div>
    )
}