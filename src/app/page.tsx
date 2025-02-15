import { Metadata } from 'next'
import { SermonList } from '@/components/posts/SermonList'
import { ChurchNav } from '@/components/churches/ChurchNav'
import { getSermons, getChurches } from '@/lib/api'
import { ChurchListResponseSchema, SermonListResponseSchema, Church, Sermon } from '@/lib/schema'

export const metadata: Metadata = {
    title: '홈 - 교회 포털',
}

export default async function Home() {
    let churches: Church[] = [];
    let sermons: Sermon[] = [];

    try {
        const [sermonsResponse, churchesResponse] = await Promise.allSettled([
            getSermons(),
            getChurches()
        ]);

        // API 응답 전체 구조 검증
        if (churchesResponse.status === 'fulfilled') {
            const validated = ChurchListResponseSchema.parse(churchesResponse.value);
            churches = validated.data;
        }
        
        if (sermonsResponse.status === 'fulfilled') {
            const validated = SermonListResponseSchema.parse(sermonsResponse.value);
            sermons = validated.data;
        }
    } catch (error) {
        console.error('Data validation failed:', error);
        throw new Error('데이터 검증에 실패했습니다');
    }

    return (
        <>
            <section className="py-8">
                <h2 className="text-2xl font-bold mb-6">최근 설교</h2>
                <SermonList sermons={sermons} />
            </section>
            <ChurchNav churches={churches} sermons={sermons} />
        </>
    )
}