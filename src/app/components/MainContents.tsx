import ImageCard from "./ImageCard";

export default function MainContent() {
    const items = [
        { src: "/images/sample1.jpg", title: "Sample Image 1", description: "이것은 첫 번째 이미지 설명입니다." },
        { src: "/images/sample2.jpg", title: "Sample Image 2", description: "이것은 두 번째 이미지 설명입니다." }
    ];

    return (
        <div className="max-w-screen-md mx-auto p-4 space-y-4">
            {items.map((item, idx) => (
                <ImageCard
                    key={idx}
                    src={item.src}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </div>
    );
}