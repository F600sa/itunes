import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D0C1D] px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-white">404 — الصفحة غير موجودة</h1>
      <p className="mb-6 text-lg text-gray-400">عذراً، لم نجد ما تبحث عنه.</p>
      <Link
        href="/"
        className="rounded bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
