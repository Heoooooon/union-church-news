import { Metadata } from 'next'
import { ChurchList } from '@/components/churches/ChurchList'
import {getChurches} from "@/lib/api";

export const metadata: Metadata = {
    title: '교회 목록 - 교회 포털',
}

export default async function Churches() {

    const churches = await getChurches();

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">교회 목록</h1>
            <ChurchList churches={churches.data} />
        </div>
    )
}