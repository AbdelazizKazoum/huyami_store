import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("store");

  const categories = [
    { id: 1, name: "Electronics", image: "📱", count: 120 },
    { id: 2, name: "Fashion", image: "👕", count: 85 },
    { id: 3, name: "Home & Garden", image: "🏠", count: 64 },
    { id: 4, name: "Sports", image: "⚽", count: 92 },
    { id: 5, name: "Books", image: "📚", count: 156 },
    { id: 6, name: "Toys", image: "🧸", count: 73 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("categories")}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/categories/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-4xl">{category.image}</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.count} products available
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact our support team and we&apos;ll help you find the perfect
              product
            </p>
            <Link
              href={`/${locale}/contact`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
