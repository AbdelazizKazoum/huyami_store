"use client";
import React, { useState, Fragment } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  Globe,
  ChevronDown,
  Truck,
  Clock,
  HandCoins,
} from "lucide-react";
import { Transition } from "@headlessui/react";

// --- Type Definitions ---

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type Product = {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  isNew: boolean;
  description: string;
  category: Category;
  subImages: string[];
  keywords: string[];
};

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

// --- Mock Data ---

const categories: Category[] = [
  {
    id: 1,
    name: "العناية بالبشرة",
    description: "كل ما تحتاجينه لبشرة نضرة وصحية.",
    image: "https://placehold.co/200x200/f3e0e6/ffffff?text=بشرة",
  },
  {
    id: 2,
    name: "العناية بالشعر",
    description: "منتجات طبيعية لتقوية وتغذية شعرك.",
    image: "https://placehold.co/200x200/f0e6d3/ffffff?text=شعر",
  },
  {
    id: 3,
    name: "العطور",
    description: "تشكيلة فاخرة من العطور الشرقية والغربية.",
    image: "https://placehold.co/200x200/e4d8c8/ffffff?text=عطور",
  },
  {
    id: 4,
    name: "المكياج",
    description: "أبرزي جمالك مع مجموعتنا من المكياج.",
    image: "https://placehold.co/200x200/d6c2b1/ffffff?text=مكياج",
  },
  {
    id: 5,
    name: "العناية بالجسم",
    description: "دللي جسمك بمنتجاتنا المرطبة والمغذية.",
    image: "https://placehold.co/200x200/c7b7a7/ffffff?text=جسم",
  },
  {
    id: 6,
    name: "منتجات عضوية",
    description: "منتجات طبيعية 100% وخالية من المواد الكيميائية.",
    image: "https://placehold.co/200x200/d1e4d1/ffffff?text=عضوي",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "كريم مرطب بالصبار",
    price: "85.00 ر.س",
    originalPrice: "120.00 ر.س",
    image: "https://placehold.co/400x400/d1e4d1/ffffff?text=منتج+1",
    isNew: true,
    description:
      "كريم غني بخلاصة الصبار الطبيعي لترطيب عميق وتهدئة البشرة الحساسة. مثالي للاستخدام اليومي.",
    category: categories[0], // العناية بالبشرة
    subImages: [
      "https://placehold.co/400x400/d1e4d1/ffffff?text=صورة+2",
      "https://placehold.co/400x400/d1e4d1/ffffff?text=صورة+3",
    ],
    keywords: ["كريم", "صبار", "ترطيب", "بشرة حساسة"],
  },
  {
    id: 2,
    name: "زيت الأرغان الأصلي",
    price: "150.00 ر.س",
    image: "https://placehold.co/400x400/e4d8c8/ffffff?text=منتج+2",
    isNew: false,
    description:
      "زيت الأرغان المغربي النقي 100% لتغذية الشعر والبشرة والأظافر. يعالج التقصف ويمنح لمعاناً طبيعياً.",
    category: categories[1], // العناية بالشعر
    subImages: [],
    keywords: ["زيت", "أرغان", "شعر", "بشرة", "أظافر"],
  },
  {
    id: 3,
    name: "صابون الطين المغربي",
    price: "45.00 ر.س",
    image: "https://placehold.co/400x400/c7b7a7/ffffff?text=منتج+3",
    isNew: false,
    description:
      "صابون طبيعي مصنوع من الطين المغربي (الغاسول) لتنظيف عميق للمسام وإزالة الشوائب.",
    category: categories[4], // العناية بالجسم
    subImages: [],
    keywords: ["صابون", "طين مغربي", "غاسول", "تنظيف"],
  },
  {
    id: 4,
    name: "عطر العود الفاخر",
    price: "250.00 ر.س",
    originalPrice: "300.00 ر.س",
    image: "https://placehold.co/400x400/b4a69a/ffffff?text=منتج+4",
    isNew: true,
    description:
      "عطر شرقي فاخر بلمسة من العود الكمبودي الأصيل. يدوم طويلاً ومناسب للجنسين.",
    category: categories[2], // العطور
    subImages: [],
    keywords: ["عطر", "عود", "فاخر", "شرقي"],
  },
  {
    id: 5,
    name: "مقشر الجسم بالقهوة",
    price: "70.00 ر.س",
    image: "https://placehold.co/400x400/d6c2b1/ffffff?text=منتج+5",
    isNew: false,
    description:
      "مقشر طبيعي بحبيبات القهوة لإزالة الجلد الميت وتنشيط الدورة الدموية، يترك البشرة ناعمة ومشرقة.",
    category: categories[4], // العناية بالجسم
    subImages: [],
    keywords: ["مقشر", "قهوة", "جسم", "تقشير"],
  },
  {
    id: 6,
    name: "ماء الورد الطبيعي",
    price: "35.00 ر.س",
    image: "https://placehold.co/400x400/f3e0e6/ffffff?text=منتج+6",
    isNew: false,
    description:
      "ماء ورد مقطر 100%، يستخدم كتونر طبيعي لإنعاش البشرة وإغلاق المسام.",
    category: categories[0], // العناية بالبشرة
    subImages: [],
    keywords: ["ماء ورد", "تونر", "بشرة"],
  },
  {
    id: 7,
    name: "بلسم الشعر بزبدة الشيا",
    price: "95.00 ر.س",
    image: "https://placehold.co/400x400/f0e6d3/ffffff?text=منتج+7",
    isNew: true,
    description:
      "بلسم غني بزبدة الشيا لترطيب الشعر الجاف والتالف، يسهل التسريح ويمنح الشعر ملمساً حريرياً.",
    category: categories[1], // العناية بالشعر
    subImages: [],
    keywords: ["بلسم", "شيا", "شعر جاف", "ترطيب"],
  },
  {
    id: 8,
    name: "ماسك الفحم النشط",
    price: "60.00 ر.س",
    originalPrice: "80.00 ر.س",
    image: "https://placehold.co/400x400/a3a3a3/ffffff?text=منتج+8",
    isNew: false,
    description:
      "ماسك الفحم النشط لتنقية البشرة وإزالة الرؤوس السوداء والدهون الزائدة.",
    category: categories[0], // العناية بالبشرة
    subImages: [],
    keywords: ["ماسك", "فحم", "رؤوس سوداء", "بشرة دهنية"],
  },
  {
    id: 9,
    name: "سيروم فيتامين سي",
    price: "110.00 ر.س",
    image: "https://placehold.co/400x400/f8c98d/ffffff?text=منتج+9",
    isNew: true,
    description:
      "سيروم مركز بفيتامين سي لنضارة البشرة، تفتيح البقع الداكنة ومحاربة علامات التقدم في السن.",
    category: categories[0], // العناية بالبشرة
    subImages: [],
    keywords: ["سيروم", "فيتامين سي", "نضارة", "تفتيح"],
  },
  {
    id: 10,
    name: "كريم العين بالخيار",
    price: "75.00 ر.س",
    originalPrice: "90.00 ر.س",
    image: "https://placehold.co/400x400/b3e6e0/ffffff?text=منتج+10",
    isNew: false,
    description:
      "كريم خفيف بمنطقة العين بخلاصة الخيار لتقليل الانتفاخات والهالات السوداء.",
    category: categories[0], // العناية بالبشرة
    subImages: [],
    keywords: ["كريم عين", "خيار", "هالات سوداء"],
  },
];

const initialCartItems: CartItem[] = [
  {
    id: 2,
    name: "زيت الأرغان الأصلي",
    price: "150.00 ر.س",
    image: "https://placehold.co/400x400/e4d8c8/ffffff?text=منتج+2",
    quantity: 1,
  },
  {
    id: 6,
    name: "ماء الورد الطبيعي",
    price: "35.00 ر.س",
    image: "https://placehold.co/400x400/f3e0e6/ffffff?text=منتج+6",
    quantity: 2,
  },
];

// --- Components ---

const NoticeBar: React.FC = () => {
  return (
    <div className="bg-green-100 text-green-900 py-3 text-center">
      <span className="text-sm md:text-lg font-bold tracking-wide px-4">
        شحن مجاني لجميع الطلبات في المغرب خلال 24 إلى 48 ساعة – الدفع عند
        الاستلام متاح
      </span>
    </div>
  );
};

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("AR");

  return (
    <div className="sticky top-0 z-40">
      <header className="bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex flex-col items-start leading-none">
                <span
                  className="text-4xl font-bold text-amber-500"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  Huyamy
                </span>
                <span className="text-sm text-green-800 font-semibold -mt-1 tracking-wider">
                  Coopérative
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8 md:rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                الرئيسية
              </a>
              <a
                href="#"
                className="text-green-800 font-semibold border-b-2 border-green-700 pb-1"
              >
                المتجر
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                عروض
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                تواصل معنا
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-green-800 rounded-full hover:bg-gray-100 transition-colors duration-300 hidden md:block"
              >
                <Search size={24} />
              </button>

              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center p-2 text-gray-600 hover:text-green-800 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <Globe size={24} />
                  <span className="font-semibold mx-1 text-sm">
                    {currentLang}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isLangMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border z-50">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("AR");
                        setIsLangMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      العربية (AR)
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("FR");
                        setIsLangMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Français (FR)
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("EN");
                        setIsLangMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      English (EN)
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={onCartClick}
                className="p-2 text-gray-600 hover:text-green-800 rounded-full hover:bg-gray-100 transition-colors duration-300 relative"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-green-800 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col items-center p-4 space-y-4">
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                الرئيسية
              </a>
              <a href="#" className="text-green-800 font-semibold">
                المتجر
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                عروض
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                تواصل معنا
              </a>

              <div className="border-t border-gray-200 w-full my-2"></div>

              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-green-800 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <Search size={22} />
                <span className="mr-3">بحث</span>
              </button>

              <div className="w-full">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="w-full flex items-center justify-between p-2 text-gray-600 hover:text-green-800 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center">
                    <Globe size={22} />
                    <span className="mr-3">اللغة: {currentLang}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isLangMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLangMenuOpen && (
                  <div className="pl-8 rtl:pr-8 rtl:pl-0 pt-2 space-y-2 text-right">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("AR");
                        setIsLangMenuOpen(false);
                      }}
                      className="block text-gray-700 hover:text-green-800"
                    >
                      العربية (AR)
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("FR");
                        setIsLangMenuOpen(false);
                      }}
                      className="block text-gray-700 hover:text-green-800"
                    >
                      Français (FR)
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentLang("EN");
                        setIsLangMenuOpen(false);
                      }}
                      className="block text-gray-700 hover:text-green-800"
                    >
                      English (EN)
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div className="bg-white shadow-md border-t border-gray-100 transition-all duration-300">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                setIsSearchOpen(false);
              }}
            >
              <input
                type="text"
                placeholder="...ابحث عن منتجك المفضل"
                autoFocus
                className="w-full h-12 text-lg bg-gray-100 border-2 border-transparent rounded-full pl-14 pr-12 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PromotionalBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#f7f6f2]">
      <a href="#" className="block">
        <img
          src="https://placehold.co/1600x450/f7f6f2/166534?text=منتجات+طبيعية+بجودة+عالية"
          alt="عرض ترويجي"
          className="w-full h-auto object-cover"
        />
      </a>
    </div>
  );
};

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <Truck size={40} className="text-green-800 mb-4" />,
      title: "شحن مجاني",
      description: "لجميع الطلبات في المغرب",
    },
    {
      icon: <Clock size={40} className="text-green-800 mb-4" />,
      title: "توصيل في الوقت المحدد",
      description: "خلال 24 إلى 48 ساعة",
    },
    {
      icon: <HandCoins size={40} className="text-green-800 mb-4" />,
      title: "الدفع عند الاستلام",
      description: "الدفع نقداً عند وصول طلبك",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-16 relative z-10">
        {/* Desktop View: Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center border border-gray-100"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Mobile View: Single compact card */}
        <div className="md:hidden bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <div className="flex justify-around items-start text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-1 w-1/3"
              >
                {React.cloneElement(feature.icon, {
                  size: 32,
                  className: "text-green-800 mb-2",
                })}
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="text-center mb-16">
      <h2
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 inline-block relative"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {children}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-700 rounded-full"></span>
      </h2>
    </div>
  );
};

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
}) => {
  return (
    <div className="bg-white pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>تصفح حسب الفئة</SectionTitle>
        <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-12 mb-12">
          اكتشفي مجموعاتنا المتنوعة التي تلبي كل احتياجات جمالك.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {categories.map((category) => (
            <a
              href={`/collections/${category.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={category.id}
              className="group text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200 group-hover:border-green-700 transition-all duration-300 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-md font-semibold text-gray-800 group-hover:text-green-800 transition-colors duration-300">
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const parsePrice = (priceString?: string) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.]/g, ""));
  };

  const priceNum = parsePrice(product.price);
  const originalPriceNum = parsePrice(product.originalPrice);
  let discountPercentage = 0;

  if (originalPriceNum > 0 && priceNum > 0) {
    discountPercentage = Math.round(
      ((originalPriceNum - priceNum) / originalPriceNum) * 100
    );
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm border border-gray-200/60 overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            جديد
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
            خصم {discountPercentage}%
          </span>
        )}
      </div>
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-2 h-14 flex items-center justify-center">
          {product.name}
        </h3>
        <div className="flex items-baseline justify-center space-x-2 rtl:space-x-reverse mb-4">
          <p className="text-xl font-bold text-green-900">{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              {product.originalPrice}
            </p>
          )}
        </div>
        <button className="w-full bg-green-800 text-white font-bold py-3 px-6 rounded-full text-md hover:bg-green-900 transition-all duration-300 mt-auto">
          اشتر الآن
        </button>
      </div>
    </div>
  );
};

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showButton?: boolean;
  bgColor?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  showButton = false,
  bgColor = "bg-stone-50",
}) => {
  return (
    <div className={`${bgColor} py-16 sm:py-24`}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{title}</SectionTitle>
        {subtitle && (
          <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-12 mb-12">
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {showButton && (
          <div className="text-center mt-16">
            <button className="bg-green-800 text-white font-bold py-3 px-10 rounded-full hover:bg-green-900 transition-all duration-300 shadow-md">
              عرض كل المنتجات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsletterSection: React.FC = () => {
  return (
    <div className="bg-amber-50/70 py-16 sm:py-24">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          انضمي إلى قائمتنا البريدية
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          اشتركي الآن لتكوني أول من يعرف عن أحدث منتجاتنا، العروض الحصرية،
          ونصائح الجمال.
        </p>
        <form
          className="max-w-md mx-auto flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="أدخلي بريدك الإلكتروني"
            className="w-full px-5 py-3 text-lg rounded-r-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 border-2 border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-green-800 text-white font-bold px-6 py-3 rounded-l-full hover:bg-green-900 transition-all duration-300 whitespace-nowrap"
          >
            اشتراك
          </button>
        </form>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          <div className="md:col-span-1">
            <a href="#" className="flex flex-col items-start leading-none">
              <span
                className="text-4xl font-bold text-amber-400"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                Huyamy
              </span>
              <span className="text-sm text-gray-300 font-semibold -mt-1 tracking-wider">
                Coopérative
              </span>
            </a>
            <p className="text-gray-400 mt-4">
              متجرك الأول لمنتجات التجميل الطبيعية والعناية بالبشرة. نؤمن بقوة
              الطبيعة لتعزيز جمالك.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  عن المتجر
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  الشحن والتسليم
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  تواصل معنا
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">معلومات هامة</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  الأسئلة المتكررة
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ثقة و ضمان
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Huyamy. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center space-x-6 rtl:space-x-reverse">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-transform hover:scale-110"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-transform hover:scale-110"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const parsePrice = (priceString: string) =>
    parseFloat(priceString.replace(/[^0-9.]/g, ""));

  const subtotal = items.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50" dir="rtl">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        </Transition.Child>

        {/* Cart Panel */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2
                className="text-2xl font-bold text-gray-800"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                سلة التسوق
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {items.length > 0 ? (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 rtl:space-x-reverse"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{item.price}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border rounded-full">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-r-full"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 text-lg font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-l-full"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="mr-auto p-2 text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">
                      المجموع الفرعي
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      {subtotal.toFixed(2)} ر.س
                    </span>
                  </div>
                  <button className="w-full bg-green-800 text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-green-900 transition-all duration-300">
                    إتمام الشراء
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full text-center mt-3 text-green-800 font-semibold hover:underline"
                  >
                    أو متابعة التسوق
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  سلة التسوق فارغة
                </h3>
                <p className="text-gray-500 mt-2">
                  لم تقم بإضافة أي منتجات بعد.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-green-800 text-white font-bold py-3 px-8 rounded-full hover:bg-green-900 transition-all duration-300"
                >
                  ابدأ التسوق
                </button>
              </div>
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

// --- Main App Component ---
// This would be your `app/page.jsx` in a Next.js 15 project.
export default function EcommerceLandingPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <>
      <style>
        {`
          /* Remove animation styles if they are no longer needed */
      `}
      </style>
      <div
        dir="rtl"
        className="bg-white"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {/* To use the 'Cairo' font, add this to your main layout file's <head> section:
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700;800&display=swap" rel="stylesheet" />
          Also, add Font Awesome for social media icons:
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        */}
        <NoticeBar />
        <Header onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
        <main>
          <PromotionalBanner />
          <FeatureCards />
          <CategoriesSection categories={categories} />
          <ProductSection
            title="مجموعاتنا الأكثر طلبا"
            subtitle="استكشفي المنتجات التي حازت على أعلى تقييمات من عملائنا."
            products={products.slice(0, 4)}
            bgColor="bg-stone-50"
          />
          <ProductSection
            title="تشكيلة منتجاتنا المميزة"
            subtitle="تصفحي تشكيلتنا المختارة من المنتجات الطبيعية التي نالت ثقة عملائنا."
            products={products.slice(0, 10)}
            showButton={true}
            bgColor="bg-white"
          />
        </main>
        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
