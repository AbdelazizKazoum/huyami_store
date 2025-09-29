"use client";
import React, { useState, Fragment } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Trash2,
  Globe,
  ChevronDown,
  Truck,
  Clock,
  HandCoins,
} from "lucide-react";
import { Transition } from "@headlessui/react";

// UI Components
import {
  Button,
  Input,
  IconButton,
  Badge,
  Card,
  Dropdown,
  QuantitySelector,
  ThemeToggle,
} from "@/components/ui";
import Footer from "@/components/Footer";

// --- Type Definitions ---

type LocalizedString = {
  ar: string;
  fr: string;
};

type Language = "ar" | "fr";

type Currency = {
  ar: string;
  fr: string;
};

type Category = {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
};

type Product = {
  id: number;
  name: LocalizedString;
  price: number;
  originalPrice?: number;
  image: string;
  isNew: boolean;
  description: LocalizedString;
  category: Category;
  subImages: string[];
  keywords: string[];
};

type CartItem = {
  product: Product;
  quantity: number;
};

// --- Mock Data ---

const currencies: Currency = {
  ar: "د.م.",
  fr: "DHS",
};

const categories: Category[] = [
  {
    id: 1,
    name: { ar: "العناية بالبشرة", fr: "Soins de la peau" },
    description: {
      ar: "كل ما تحتاجينه لبشرة نضرة وصحية.",
      fr: "Tout ce dont vous avez besoin pour une peau fraîche et saine.",
    },
    image: "https://placehold.co/200x200/f3e0e6/ffffff?text=بشرة",
  },
  {
    id: 2,
    name: { ar: "العناية بالشعر", fr: "Soins des cheveux" },
    description: {
      ar: "منتجات طبيعية لتقوية وتغذية شعرك.",
      fr: "Produits naturels pour renforcer et nourrir vos cheveux.",
    },
    image: "https://placehold.co/200x200/f0e6d3/ffffff?text=شعر",
  },
  {
    id: 3,
    name: { ar: "العطور", fr: "Parfums" },
    description: {
      ar: "تشكيلة فاخرة من العطور الشرقية والغربية.",
      fr: "Une sélection luxueuse de parfums orientaux et occidentaux.",
    },
    image: "https://placehold.co/200x200/e4d8c8/ffffff?text=عطور",
  },
  {
    id: 4,
    name: { ar: "المكياج", fr: "Maquillage" },
    description: {
      ar: "أبرزي جمالك مع مجموعتنا من المكياج.",
      fr: "Mettez en valeur votre beauté avec notre collection de maquillage.",
    },
    image: "https://placehold.co/200x200/d6c2b1/ffffff?text=مكياج",
  },
  {
    id: 5,
    name: { ar: "العناية بالجسم", fr: "Soins du corps" },
    description: {
      ar: "دللي جسمك بمنتجاتنا المرطبة والمغذية.",
      fr: "Prenez soin de votre corps avec nos produits hydratants et nourrissants.",
    },
    image: "https://placehold.co/200x200/c7b7a7/ffffff?text=جسم",
  },
  {
    id: 6,
    name: { ar: "منتجات عضوية", fr: "Produits bio" },
    description: {
      ar: "منتجات طبيعية 100% وخالية من المواد الكيميائية.",
      fr: "Produits 100% naturels et sans produits chimiques.",
    },
    image: "https://placehold.co/200x200/d1e4d1/ffffff?text=عضوي",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: { ar: "كريم مرطب بالصبار", fr: "Crème hydratante à l'aloe vera" },
    price: 85.0,
    originalPrice: 120.0,
    image: "https://placehold.co/400x400/d1e4d1/ffffff?text=منتج+1",
    isNew: true,
    description: {
      ar: "كريم غني بخلاصة الصبار الطبيعي لترطيب عميق وتهدئة البشرة الحساسة. مثالي للاستخدام اليومي.",
      fr: "Crème riche en extrait naturel d'aloe vera pour une hydratation profonde et apaiser les peaux sensibles. Idéale pour un usage quotidien.",
    },
    category: categories[0],
    subImages: [
      "https://placehold.co/400x400/d1e4d1/ffffff?text=صورة+2",
      "https://placehold.co/400x400/d1e4d1/ffffff?text=صورة+3",
    ],
    keywords: [
      "كريم",
      "صبار",
      "ترطيب",
      "بشرة حساسة",
      "crème",
      "aloe vera",
      "hydratation",
    ],
  },
  {
    id: 2,
    name: { ar: "زيت الأرغان الأصلي", fr: "Huile d'argan authentique" },
    price: 150.0,
    image: "https://placehold.co/400x400/e4d8c8/ffffff?text=منتج+2",
    isNew: false,
    description: {
      ar: "زيت الأرغان المغربي النقي 100% لتغذية الشعر والبشرة والأظافر. يعالج التقصف ويمنح لمعاناً طبيعياً.",
      fr: "Huile d'argan marocaine 100% pure pour nourrir les cheveux, la peau et les ongles. Répare les pointes fourchues et donne un éclat naturel.",
    },
    category: categories[1],
    subImages: [],
    keywords: [
      "زيت",
      "أرغان",
      "شعر",
      "بشرة",
      "huile",
      "argan",
      "cheveux",
      "peau",
    ],
  },
  {
    id: 3,
    name: { ar: "صابون الطين المغربي", fr: "Savon à l'argile marocaine" },
    price: 45.0,
    image: "https://placehold.co/400x400/c7b7a7/ffffff?text=منتج+3",
    isNew: false,
    description: {
      ar: "صابون طبيعي مصنوع من الطين المغربي (الغاسول) لتنظيف عميق للمسام وإزالة الشوائب.",
      fr: "Savon naturel à base d'argile marocaine (Ghassoul) pour un nettoyage en profondeur des pores et l'élimination des impuretés.",
    },
    category: categories[4],
    subImages: [],
    keywords: ["صابون", "طين مغربي", "غاسول", "تنظيف"],
  },
  {
    id: 4,
    name: { ar: "عطر العود الفاخر", fr: "Parfum de Oud luxueux" },
    price: 250.0,
    originalPrice: 300.0,
    image: "https://placehold.co/400x400/b4a69a/ffffff?text=منتج+4",
    isNew: true,
    description: {
      ar: "عطر شرقي فاخر بلمسة من العود الكمبودي الأصيل. يدوم طويلاً ومناسب للجنسين.",
      fr: "Parfum oriental luxueux avec une touche de oud cambodgien authentique. Longue durée et unisexe.",
    },
    category: categories[2],
    subImages: [],
    keywords: ["عطر", "عود", "فاخر", "شرقي"],
  },
  {
    id: 5,
    name: { ar: "مقشر الجسم بالقهوة", fr: "Gommage corporel au café" },
    price: 70.0,
    image: "https://placehold.co/400x400/d6c2b1/ffffff?text=منتج+5",
    isNew: false,
    description: {
      ar: "مقشر طبيعي بحبيبات القهوة لإزالة الجلد الميت وتنشيط الدورة الدموية، يترك البشرة ناعمة ومشرقة.",
      fr: "Gommage naturel aux grains de café pour éliminer les peaux mortes et stimuler la circulation sanguine, laissant la peau douce et éclatante.",
    },
    category: categories[4],
    subImages: [],
    keywords: ["مقشر", "قهوة", "جسم", "تقشير"],
  },
  {
    id: 6,
    name: { ar: "ماء الورد الطبيعي", fr: "Eau de rose naturelle" },
    price: 35.0,
    image: "https://placehold.co/400x400/f3e0e6/ffffff?text=منتج+6",
    isNew: false,
    description: {
      ar: "ماء ورد مقطر 100%، يستخدم كتونر طبيعي لإنعاش البشرة وإغلاق المسام.",
      fr: "Eau de rose 100% distillée, utilisée comme tonique naturel pour rafraîchir la peau et resserrer les pores.",
    },
    category: categories[0],
    subImages: [],
    keywords: ["ماء ورد", "تونر", "بشرة"],
  },
  {
    id: 7,
    name: {
      ar: "بلسم الشعر بزبدة الشيا",
      fr: "Après-shampooing au beurre de karité",
    },
    price: 95.0,
    image: "https://placehold.co/400x400/f0e6d3/ffffff?text=منتج+7",
    isNew: true,
    description: {
      ar: "بلسم غني بزبدة الشيا لترطيب الشعر الجاف والتالف، يسهل التسريح ويمنح الشعر ملمساً حريرياً.",
      fr: "Après-shampooing riche en beurre de karité pour hydrater les cheveux secs et abîmés, facilite le coiffage et donne aux cheveux une texture soyeuse.",
    },
    category: categories[1],
    subImages: [],
    keywords: ["بلسم", "شيا", "شعر جاف", "ترطيب"],
  },
  {
    id: 8,
    name: { ar: "ماسك الفحم النشط", fr: "Masque au charbon actif" },
    price: 60.0,
    originalPrice: 80.0,
    image: "https://placehold.co/400x400/a3a3a3/ffffff?text=منتج+8",
    isNew: false,
    description: {
      ar: "ماسك الفحم النشط لتنقية البشرة وإزالة الرؤوس السوداء والدهون الزائدة.",
      fr: "Masque au charbon actif pour purifier la peau, éliminer les points noirs et l'excès de sébum.",
    },
    category: categories[0],
    subImages: [],
    keywords: ["ماسك", "فحم", "رؤوس سوداء", "بشرة دهنية"],
  },
  {
    id: 9,
    name: { ar: "سيروم فيتامين سي", fr: "Sérum à la vitamine C" },
    price: 110.0,
    image: "https://placehold.co/400x400/f8c98d/ffffff?text=منتج+9",
    isNew: true,
    description: {
      ar: "سيروم مركز بفيتامين سي لنضارة البشرة، تفتيح البقع الداكنة ومحاربة علامات التقدم في السن.",
      fr: "Sérum concentré en vitamine C pour l'éclat de la peau, l'éclaircissement des taches brunes et la lutte contre les signes de l'âge.",
    },
    category: categories[0],
    subImages: [],
    keywords: ["سيروم", "فيتامين سي", "نضارة", "تفتيح"],
  },
  {
    id: 10,
    name: {
      ar: "كريم العين بالخيار",
      fr: "Crème contour des yeux au concombre",
    },
    price: 75.0,
    originalPrice: 90.0,
    image: "https://placehold.co/400x400/b3e6e0/ffffff?text=منتج+10",
    isNew: false,
    description: {
      ar: "كريم خفيف بمنطقة العين بخلاصة الخيار لتقليل الانتفاخات والهالات السوداء.",
      fr: "Crème légère pour le contour des yeux à l'extrait de concombre pour réduire les poches et les cernes.",
    },
    category: categories[0],
    subImages: [],
    keywords: ["كريم عين", "خيار", "هالات سوداء"],
  },
];

const initialCartItems: CartItem[] = [
  {
    product: products[1],
    quantity: 1,
  },
];

// --- Components ---

const NoticeBar: React.FC = () => {
  return (
    <div className="bg-primary-light text-primary-darker py-3 text-center">
      <span className="text-sm md:text-lg font-bold tracking-wide px-4">
        شحن مجاني لجميع الطلبات في المغرب خلال 24 إلى 48 ساعة – الدفع عند
        الاستلام متاح
      </span>
    </div>
  );
};

type HeaderProps = Record<string, never>;

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [lang, setLang] = useState<Language>("ar");

  const currency = currencies[lang];

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        lang={lang}
        currency={currency}
      />
      <div className="sticky top-0 z-40">
        <header className="bg-theme-primary shadow-sm border-b border-theme-light">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#" className="flex flex-col items-start leading-none">
                  <span
                    className="text-4xl font-bold text-secondary"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    Huyamy
                  </span>
                  <span className="text-sm text-primary-dark font-semibold -mt-1 tracking-wider">
                    Coopérative
                  </span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex md:items-center md:space-x-8 md:rtl:space-x-reverse">
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  الرئيسية
                </a>
                <a
                  href="#"
                  className="text-primary-dark font-semibold border-b-2 border-primary pb-1"
                >
                  المتجر
                </a>
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  عروض
                </a>
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  تواصل معنا
                </a>
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <IconButton
                  icon={<Search size={24} />}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hidden md:block"
                />

                {/* Language Selector */}
                <Dropdown
                  className="hidden md:block"
                  position="right"
                  trigger={
                    <IconButton
                      icon={
                        <div className="flex items-center">
                          <Globe size={24} />
                          <span className="font-semibold mx-1 text-sm">
                            {lang.toUpperCase()}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isLangMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      }
                    />
                  }
                  items={[
                    {
                      id: "ar",
                      label: "العربية (AR)",
                      value: "ar",
                      onClick: () => setLang("ar"),
                    },
                    {
                      id: "fr",
                      label: "Français (FR)",
                      value: "fr",
                      onClick: () => setLang("fr"),
                    },
                  ]}
                />

                <ThemeToggle className="hidden md:block" />

                <IconButton
                  icon={<ShoppingCart size={24} />}
                  badge={cartItems.length}
                  onClick={() => setIsCartOpen(true)}
                />

                <IconButton
                  icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-theme-primary border-t border-theme-light">
              <div className="flex flex-col items-center p-4 space-y-4">
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  الرئيسية
                </a>
                <a href="#" className="text-primary-dark font-semibold">
                  المتجر
                </a>
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  عروض
                </a>
                <a
                  href="#"
                  className="text-theme-secondary hover:text-primary-dark transition-colors duration-300"
                >
                  تواصل معنا
                </a>

                <div className="border-t border-theme-light w-full my-2"></div>

                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center"
                >
                  <Search size={22} />
                  <span className="mr-3">بحث</span>
                </Button>

                <div className="w-full flex justify-center">
                  <ThemeToggle size="md" />
                </div>

                <div className="w-full">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="w-full flex items-center justify-between p-2 text-theme-secondary hover:text-primary-dark rounded-lg hover:bg-theme-tertiary transition-colors duration-300"
                  >
                    <div className="flex items-center">
                      <Globe size={22} />
                      <span className="mr-3">اللغة: {lang.toUpperCase()}</span>
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
                          setLang("ar");
                          setIsLangMenuOpen(false);
                        }}
                        className="block text-theme-primary hover:text-primary-dark"
                      >
                        العربية (AR)
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLang("fr");
                          setIsLangMenuOpen(false);
                        }}
                        className="block text-theme-primary hover:text-primary-dark"
                      >
                        Français (FR)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        {isSearchOpen && (
          <div className="bg-theme-primary shadow-md border-t border-theme-light transition-all duration-300">
            <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(false);
                }}
              >
                <Input
                  variant="search"
                  placeholder="...ابحث عن منتجك المفضل"
                  autoFocus
                  leftIcon={<Search className="h-6 w-6" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-theme-muted hover:text-theme-primary rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                  }
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: <Truck size={40} className="text-primary-dark mb-4" />,
      title: "شحن مجاني",
      description: "لجميع الطلبات في المغرب",
    },
    {
      icon: <Clock size={40} className="text-primary-dark mb-4" />,
      title: "توصيل في الوقت المحدد",
      description: "خلال 24 إلى 48 ساعة",
    },
    {
      icon: <HandCoins size={40} className="text-primary-dark mb-4" />,
      title: "الدفع عند الاستلام",
      description: "الدفع نقداً عند وصول طلبك",
    },
  ];

  return (
    <section className="relative">
      {/* Promotional Banner */}
      <div className="w-full bg-[#f7f6f2]">
        <a href="#" className="block">
          <img
            src="https://placehold.co/1600x450/f7f6f2/166534?text=منتجات+طبيعية+بجودة+عالية"
            alt="عرض ترويجي"
            className="w-full h-auto object-cover"
          />
        </a>
      </div>

      {/* Feature Cards */}
      <div className="bg-theme-primary">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-16 relative z-10">
          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="text-center flex flex-col items-center"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-theme-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-theme-muted">{feature.description}</p>
              </Card>
            ))}
          </div>
          {/* Mobile View: Single compact card */}
          <Card variant="elevated" padding="md" className="md:hidden">
            <div className="flex justify-around items-start text-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center px-1 w-1/3"
                >
                  {React.cloneElement(feature.icon, {
                    size: 32,
                    className: "text-primary-dark mb-2",
                  })}
                  <h3 className="text-xs sm:text-sm font-bold text-theme-primary leading-tight">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="text-center mb-16">
      <h2
        className="text-3xl md:text-4xl font-bold text-theme-primary mb-4 inline-block relative"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {children}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
      </h2>
    </div>
  );
};

interface CategoriesSectionProps {
  categories: Category[];
  lang?: Language;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  lang = "ar",
}) => {
  return (
    <div className="bg-theme-primary pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>تصفح حسب الفئة</SectionTitle>
        <p className="text-center text-theme-secondary max-w-2xl mx-auto -mt-12 mb-12">
          اكتشفي مجموعاتنا المتنوعة التي تلبي كل احتياجات جمالك.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {categories.map((category) => (
            <a
              href={`/collections/${category.name.fr
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={category.id}
              className="group text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                <img
                  src={category.image}
                  alt={category.name[lang || "ar"]}
                  className="w-full h-full object-cover rounded-full border-2 border-theme-light group-hover:border-primary transition-all duration-300 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-md font-semibold text-theme-primary group-hover:text-primary-dark transition-colors duration-300">
                {category.name[lang || "ar"]}
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
  lang?: Language;
  currency?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang = "ar",
  currency = "د.م.",
}) => {
  const originalPriceNum = product.originalPrice || 0;
  let discountPercentage = 0;

  if (originalPriceNum > 0 && product.price > 0) {
    discountPercentage = Math.round(
      ((originalPriceNum - product.price) / originalPriceNum) * 100
    );
  }

  return (
    <Card
      className="group overflow-hidden flex flex-col h-full transform"
      variant="default"
      padding="none"
      hover={true}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name[lang || "ar"]}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <Badge variant="new" size="sm" position="top-left">
            {lang === "ar" ? "جديد" : "Nouveau"}
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge variant="discount" size="md" position="top-right">
            {lang === "ar"
              ? `خصم ${discountPercentage}%`
              : `-${discountPercentage}%`}
          </Badge>
        )}
      </div>
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-theme-primary truncate mb-2 h-14 flex items-center justify-center">
          {product.name[lang || "ar"]}
        </h3>
        <div className="flex items-baseline justify-center space-x-2 rtl:space-x-reverse mb-4">
          <p className="text-xl font-bold text-primary-darker">
            {product.price.toFixed(2)} {currency}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-theme-muted line-through">
              {product.originalPrice.toFixed(2)} {currency}
            </p>
          )}
        </div>
        <Button variant="primary" size="md" fullWidth className="mt-auto">
          {(lang || "ar") === "ar" ? "اشتر الآن" : "Acheter"}
        </Button>
      </div>
    </Card>
  );
};

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  lang?: Language;
  currency?: string;
  showButton?: boolean;
  bgColor?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  lang = "ar",
  currency = "د.م.",
  showButton = false,
  bgColor = "bg-theme-secondary",
}) => {
  return (
    <div className={`${bgColor} py-16 sm:py-24`}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{title}</SectionTitle>
        {subtitle && (
          <p className="text-center text-theme-secondary max-w-2xl mx-auto -mt-12 mb-12">
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              currency={currency}
            />
          ))}
        </div>
        {showButton && (
          <div className="text-center mt-16">
            <Button variant="primary" size="lg">
              عرض كل المنتجات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsletterSection: React.FC = () => {
  return (
    <div className="bg-theme-accent py-16 sm:py-24">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-theme-primary mb-4"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          انضمي إلى قائمتنا البريدية
        </h2>
        <p className="text-theme-secondary max-w-2xl mx-auto mb-8">
          اشتركي الآن لتكوني أول من يعرف عن أحدث منتجاتنا، العروض الحصرية،
          ونصائح الجمال.
        </p>
        <form
          className="max-w-md mx-auto flex gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-grow">
            <Input
              type="email"
              placeholder="أدخلي بريدك الإلكتروني"
              variant="rounded"
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="whitespace-nowrap rounded-full"
          >
            اشتراك
          </Button>
        </form>
      </div>
    </div>
  );
};

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  lang: Language;
  currency: string;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  lang,
  currency,
}) => {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
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
          <div className="fixed top-0 left-0 h-full w-full max-w-md bg-theme-primary shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-theme-light">
              <h2
                className="text-2xl font-bold text-theme-primary"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                سلة التسوق
              </h2>
              <IconButton
                icon={<X size={24} />}
                onClick={onClose}
                variant="ghost"
              />
            </div>

            {items.length > 0 ? (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4 rtl:space-x-reverse"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name[lang || "ar"]}
                        className="w-20 h-20 object-cover rounded-md border border-theme-light"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-theme-primary">
                          {item.product.name[lang || "ar"]}
                        </h3>
                        <p className="text-theme-muted text-sm">
                          {item.product.price.toFixed(2)} {currency}
                        </p>
                        <div className="flex items-center mt-2">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(newQuantity) =>
                              onUpdateQuantity(item.product.id, newQuantity)
                            }
                            min={1}
                            max={99}
                            size="sm"
                          />
                          <IconButton
                            icon={<Trash2 size={18} />}
                            onClick={() => onRemoveItem(item.product.id)}
                            variant="ghost"
                            className="mr-auto text-red-500 hover:bg-red-50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-theme-light bg-theme-tertiary">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-theme-secondary">
                      المجموع الفرعي
                    </span>
                    <span className="text-2xl font-bold text-theme-primary">
                      {subtotal.toFixed(2)} {currency}
                    </span>
                  </div>
                  <Button variant="primary" size="lg" fullWidth>
                    إتمام الشراء
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    fullWidth
                    onClick={onClose}
                    className="mt-3"
                  >
                    أو متابعة التسوق
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <ShoppingCart size={64} className="text-theme-secondary mb-4" />
                <h3 className="text-xl font-semibold text-theme-primary">
                  سلة التسوق فارغة
                </h3>
                <p className="text-theme-muted mt-2">
                  لم تقم بإضافة أي منتجات بعد.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onClose}
                  className="mt-6"
                >
                  ابدأ التسوق
                </Button>
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
  return (
    <>
      <style>
        {`
          /* Custom styles can go here if needed */
      `}
      </style>
      <div
        dir="rtl"
        className="bg-theme-primary"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <NoticeBar />
        <Header />
        <main>
          <HeroSection />
          <CategoriesSection categories={categories} />
          <ProductSection
            title="مجموعاتنا الأكثر طلبا"
            subtitle="استكشفي المنتجات التي حازت على أعلى تقييمات من عملائنا."
            products={products.slice(0, 4)}
            bgColor="bg-theme-secondary"
          />
          <ProductSection
            title="تشكيلة منتجاتنا المميزة"
            subtitle="تصفحي تشكيلتنا المختارة من المنتجات الطبيعية التي نالت ثقة عملائنا."
            products={products.slice(0, 10)}
            showButton={true}
            bgColor="bg-theme-primary"
          />
        </main>
        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
