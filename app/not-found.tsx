import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0C1D] px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">404 — الصفحة غير موجودة</h1>
            <p className="text-lg text-gray-400 mb-6">
                عذراً، لم نجد ما تبحث عنه.
            </p>
            <Link
                href="/"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
                العودة للصفحة الرئيسية
            </Link>
        </div>
    );
}