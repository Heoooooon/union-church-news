// app/churches/[documentId]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChurchDetail } from '@/components/churches/ChurchDetail'
import { SermonList } from '@/components/posts/SermonList'
import { getChurch, getChurchSermons } from "@/lib/api"
import type { Church, Sermon } from '@/types'

interface Props {
    params: { documentId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const churchResponse = await getChurch(params.documentId)
    if (!churchResponse.data) {
        return { title: '교회를 찾을 수 없습니다 - 교회 포털' }
    }
    const church = (churchResponse.data as unknown) as Church
    return { title: `${church.name} - 교회 포털` }
}

export default async function Church({ params }: Props) {
    const churchResponse = await getChurch(params.documentId)
    if (!churchResponse.data) notFound()

    const sermonsResponse = await getChurchSermons(params.documentId)

    // 타입 변환
    const church = (churchResponse.data as unknown) as Church
    const sermons = (sermonsResponse.data as unknown) as Sermon[]

    return (
        <div className="py-8">
            <ChurchDetail church={church} />
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-6">설교 목록</h2>
                <SermonList sermons={sermons} />
            </section>
        </div>
    )
}