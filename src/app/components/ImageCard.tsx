import Image from "next/image";

interface ImageCardProps {
    src: string;
    title: string;
    description: string;
}

export default function ImageCard({ src, title, description }: ImageCardProps) {
    return (
        <div className="border rounded-md p-4 shadow-sm">
            <Image src={src} alt={title} width={300} height={200} className="w-full h-auto object-cover rounded" />
            <h3 className="mt-2 font-bold text-lg">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    );
}