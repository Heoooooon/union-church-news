// src/components/error-boundary.tsx 신규 생성
'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-red-600 font-semibold mb-2">문제가 발생했습니다</h2>
            <button 
                onClick={reset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                다시 시도
            </button>
        </div>
    );
}