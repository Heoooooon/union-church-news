import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

interface Church {
    id: string
    attributes: {
        name: string
        slug: string
        description: string
        address: string
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
    }
}

interface ChurchListProps {
    churches: Church[]
}

export function ChurchList({ churches }: ChurchListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {churches.map((church) => (
                <Link key={church.id} href={`/churches/${church.attributes.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="aspect-video relative">
                            <Image
                                src={church.attributes.image.data.attributes.url}
                                alt={church.attributes.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-2">{church.attributes.name}</h2>
                            <p className="text-gray-600 text-sm mb-2">{church.attributes.address}</p>
                            <p className="text-gray-700 line-clamp-2">
                                {church.attributes.description}
                            </p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}