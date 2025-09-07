"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee, IceCream2, Martini, Milk, Snowflake, Sandwich, Leaf,
  Moon, Sun, Languages, CupSoda, IceCream, Utensils
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------------------------- BRAND & THEME ---------------------------- */
const BRAND = {
  name: { en: "Gold Lounge", ar: "جولد لاونج" },
  logo: "logo.jpg",
};

/* ------------------------------- I18N --------------------------------- */
const STR = {
  en: {
    title: `${BRAND.name.en} • Digital Menu`,
    subtitle: "Browse sections and tell the waiter your choice.",
    explore: "Explore More",
    waiterNote: "Order through the waiter • No payments here",
    lang: "العربية",
    theme: "Theme",
    sections: {
      hot: "Hot coffee",
      tea: "Teas & Herbs",
      cold: "Iced coffee",
      frappes: "Frappes",
      mojitos: "Mojitos",
      smoothies: "Smoothies",
      fresh: "Fresh Juices",
      soft: "Soft Drinks & Water",
      yogurt: "Yogurt Mixes",
      desserts: "Desserts",
      extras: "Extras",
    },
    price: (p) => `$${p.toFixed(2)}`,
  },
  ar: {
    title: `${BRAND.name.ar} • القائمة الرقمية`,
    subtitle: "تصفَّح الأقسام وأخبر النادل باختيارك.",
    explore: "اكتشف المزيد",
    waiterNote: "الطلب يتم عبر النادل • لا مدفوعات هنا",
    lang: "EN",
    theme: "الوضع",
    sections: {
      hot: "قهوة ساخنة",
      tea: "شاي ومشروبات عشبية",
      cold: "قهوة مثلجة",
      frappes: "فرابتشينو",
      mojitos: "موهيتو",
      smoothies: "سموذي",
      fresh: "عصائر فريش",
      soft: "مشروبات غازية ومياه",
      yogurt: "زبادي ميكس",
      desserts: "حلويات",
      extras: "إضافات",
    },
    price: (p) => `${p.toFixed(2)}$`,
  },
};

/* ---------------------------- SECTIONS + HERO -------------------------- */
const SECTIONS = [
  { id: "hot", icon: Coffee, hero: "/hot.jpg" },
  { id: "tea", icon: Leaf, hero: "/tea.jpg" },
  { id: "cold", icon: Snowflake, hero: "/iced.jpg" },
  { id: "mojitos", icon: Martini, hero: "/mojito.jpg" },
  { id: "soft", icon: CupSoda, hero: "/soft.jpg" },
  { id: "smoothies", icon: Snowflake, hero: "/smoozy.jpg" },
  { id: "fresh", icon: CupSoda, hero: "/fresh.jpg" },
  { id: "yogurt", icon: Milk, hero: "/yougurt.jpg" },
  { id: "desserts", icon: Utensils, hero: "/dessert.jpg" },
  { id: "extras", icon: Milk, hero: "/extra.jpg" },
];

/* ------------------------------ MENU DATA ----------------------------- */
/* NOTE: Prices are placeholders — update as needed.
   Any item with TODO needs your confirmation of spelling/wording. */
const ITEMS = [
/* HOT DRINKS */
{ id: 200, section: "hot", icon: Coffee, price: 0,
  name: { en: "Ristretto", ar: "ريستريتو" },
  desc: { en: "Short, concentrated espresso shot", ar: "جرعة إسبريسو قصيرة ومركزة" }
},
{ id: 205, section: "hot", icon: Coffee, price: 0,
  name: { en: "Turkish Coffee espresso (Single)", ar: "قهوة تركي سنجل" },
  desc: { en: "Traditional Turkish coffee, single serving", ar: "قهوة تركية تقليدية، جرعة واحدة" }
},
{ id: 206, section: "hot", icon: Coffee, price: 0,
  name: { en: "Turkish Coffee espresso (Double)", ar: "قهوة تركي دبل" },
  desc: { en: "Traditional Turkish coffee, double serving", ar: "قهوة تركية تقليدية، جرعتان" }
},
{ id: 203, section: "hot", icon: Coffee, price: 0,
  name: { en: "Lungo", ar: "لونجو" },
  desc: { en: "Longer espresso shot with more water", ar: "إسبريسو مطوّل بمزيد من الماء" }
},
{ id: 204, section: "hot", icon: Coffee, price: 0,
  name: { en: "Americano", ar: "أمريكان كوفي" },
  desc: { en: "Espresso diluted with hot water", ar: "إسبريسو مخفف بالماء الساخن" }
},

{ id: 207, section: "hot", icon: Coffee, price: 0,
  name: { en: "Hazelnut Coffee", ar: "قهوة بندق" },
  desc: { en: "Coffee flavored with hazelnut", ar: "قهوة بنكهات البندق" }
},
{ id: 208, section: "hot", icon: Coffee, price: 0,
  name: { en: "Macchiato", ar: "ماكياتو" },
  desc: { en: "Espresso marked with foam", ar: "إسبريسو مع لمسة من الرغوة" }
},
{ id: 209, section: "hot", icon: Coffee, price: 0,
  name: { en: "Cappuccino", ar: "كابتشينو" },
  desc: { en: "Espresso, steamed milk & foam", ar: "إسبريسو مع حليب مبخر ورغوة" }
},
{ id: 210, section: "hot", icon: Coffee, price: 0,
  name: { en: "Latte", ar: "لاتيه" },
  desc: { en: "Espresso with silky steamed milk", ar: "إسبريسو مع حليب مخمَّر ناعم" }
},
{ id: 211, section: "hot", icon: Coffee, price: 0,
  name: { en: "Flat White", ar: "فلات وايت" },
  desc: { en: "Espresso with thin microfoam milk", ar: "إسبريسو مع حليب مايكروفوم ناعم" }
},
{ id: 212, section: "hot", icon: Coffee, price: 0,
  name: { en: "Mocha", ar: "موكا" },
  desc: { en: "Espresso with chocolate and milk", ar: "إسبريسو مع شوكولاتة وحليب" }
},
{ id: 213, section: "hot", icon: Coffee, price: 0,
  name: { en: "Nescafe", ar: "نسكافيه" },
  desc: { en: "Instant coffee drink", ar: "مشروب قهوة سريع التحضير" }
},

/* TEA & HERBS */
{ id: 600, section: "tea", icon: Leaf, price: 0,
  name: { en: "Tea Pot", ar: "براد شاي" },
  desc: { en: "Classic teapot serving", ar: "شاي في براد تقليدي" }
},
{ id: 601, section: "tea", icon: Leaf, price: 0,
  name: { en: "Normal Tea", ar: "شاي عادي" },
  desc: { en: "Regular black tea", ar: "شاي أسود عادي" }
},
{ id: 602, section: "tea", icon: Leaf, price: 0,
  name: { en: "Green Tea", ar: "شاي أخضر" },
  desc: { en: "Light and refreshing green tea", ar: "شاي أخضر خفيف ومنعش" }
},
{ id: 603, section: "tea", icon: Leaf, price: 0,
  name: { en: "Tea with Milk", ar: "شاي باللبن" },
  desc: { en: "Black tea with milk", ar: "شاي أسود بالحليب" }
},
{ id: 604, section: "tea", icon: Leaf, price: 0,
  name: { en: "Anise Tea", ar: "يانسون" },
  desc: { en: "Soothing anise infusion", ar: "شاي يانسون مهدئ" }
},
{ id: 605, section: "tea", icon: Leaf, price: 0,
  name: { en: "Ginger Tea", ar: "جنزبيل" },
  desc: { en: "Hot ginger infusion", ar: "شاي جنزبيل ساخن" }
},
{ id: 606, section: "tea", icon: Leaf, price: 0,
  name: { en: "Cinnamon Tea", ar: "قرفة" },
  desc: { en: "Fragrant cinnamon infusion", ar: "شاي قرفة عطري" }
},
{ id: 607, section: "tea", icon: Leaf, price: 0,
  name: { en: "Fenugreek Tea", ar: "حلبة" },
  desc: { en: "Healthy fenugreek tea", ar: "شاي حلبة صحي" }
},
{ id: 608, section: "tea", icon: Leaf, price: 0,
  name: { en: "Mint Tea", ar: "نعناع" },
  desc: { en: "Fresh mint tea", ar: "شاي نعناع طازج" }
},
{ id: 609, section: "tea", icon: Leaf, price: 0,
  name: { en: "Lemon Tea", ar: "شاي ليمون" },
  desc: { en: "Refreshing lemon tea", ar: "شاي ليمون منعش" }
},
{ id: 610, section: "tea", icon: Leaf, price: 0,
  name: { en: "Hibiscus Tea", ar: "كركديه" },
  desc: { en: "Chilled or hot hibiscus tea", ar: "شاي كركديه ساخن أو بارد" }
},
{ id: 611, section: "tea", icon: Leaf, price: 0,
  name: { en: "Sahlab (Plain / Nuts / Fruits)", ar: "سحلب (سادة / بالمكسرات / بالفواكه)" },
  desc: { en: "Warm sahlab drink options", ar: "سحلب دافئ بعدة اختيارات" }
},
{ id: 612, section: "tea", icon: Leaf, price: 0,
  name: { en: "Herbal Cocktail", ar: "كوكتيل أعشاب" },
  desc: { en: "Mixed herbal infusion", ar: "شاي كوكتيل أعشاب" }
},

/* COLD DRINKS */
{ id: 400, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Espresso", ar: "إسبريسو بارد" },
  desc: { en: "Chilled espresso shot", ar: "جرعة إسبريسو مبردة" }
},
{ id: 401, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Americano", ar: "أمريكانو بارد" },
  desc: { en: "Espresso over chilled water & ice", ar: "إسبريسو مع ماء بارد وثلج" }
},
{ id: 402, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Latte", ar: "لاتيه بارد" },
  desc: { en: "Espresso over cold milk & ice", ar: "إسبريسو مع حليب بارد وثلج" }
},
{ id: 403, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Cappuccino", ar: "كابتشينو بارد" },
  desc: { en: "Espresso, cold milk and foam", ar: "إسبريسو مع حليب بارد ورغوة" }
},
{ id: 404, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Mocha", ar: "موكا باردة" },
  desc: { en: "Chocolate latte over ice", ar: "لاتيه شوكولاتة مع ثلج" }
},
{ id: 405, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Spanish Latte", ar: "سبانيش لاتيه بارد" },
  desc: { en: "Condensed milk, espresso & ice", ar: "إسبريسو مع حليب مكثف وثلج" }
},
{ id: 406, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Pistachio Latte", ar: "بستاشيو لاتيه بارد" },
  desc: { en: "Pistachio flavored iced latte", ar: "لاتيه بارد بنكهة الفستق" }
},
{ id: 407, section: "cold", icon: Snowflake, price: 0,
  name: { en: "Iced Nescafe", ar: "نسكافيه بارد" },
  desc: { en: "Chilled instant coffee", ar: "قهوة سريعة التحضير مثلجة" }
},

/* MOJITOS */
{ id: 40, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Classic Mojito", ar: "موهيتو كلاسيك" },
  desc: { en: "Mint, lime and soda (non-alcoholic)", ar: "نعناع، ليمون وصودا (بدون كحول)" }
},
{ id: 41, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Strawberry Mojito", ar: "موهيتو فراولة" },
  desc: { en: "Fresh strawberries with mint and soda", ar: "فراولة طازجة مع نعناع وصودا" }
},
{ id: 42, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Sunshine Drink", ar: "مشروب صن شاين" },
  desc: { en: "Sparkling soda cocktail with citrus & tropical flavors",
          ar: "كوكتيل صودا غازي بنكهات حمضية واستوائية" }
},
{ id: 43, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Red Bull Mojito", ar: "موهيتو ريد بول" },
  desc: { en: "Mint, lime, soda and Red Bull for an energizing twist",
          ar: "نعناع، ليمون، صودا وريد بول بلمسة منشّطة" }
},
{ id: 44, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Blue Sky Mojito", ar: "موهيتو بلو سكاي" },
  desc: { en: "Mint & lime with blue citrus soda",
          ar: "نعناع وليمون مع صودا حمضيات زرقاء" }
},
{ id: 45, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Blue Hawaii Mojito", ar: "موهيتو بلو هاواي" },
  desc: { en: "Tropical-style soda with mint and lime",
          ar: "صودا بطابع استوائي مع نعناع وليمون" }
},
{ id: 46, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Cherry Cola Mojito", ar: "موهيتو تشيري كولا" },
  desc: { en: "Cola with cherry flavor, mint and lime",
          ar: "كولا بنكهة الكرز مع نعناع وليمون" }
},
{ id: 47, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Soda Mint Mojito", ar: "موهيتو صودا نعناع" },
  desc: { en: "Classic mint & lime over sparkling soda",
          ar: "نعناع وليمون على صودا فوّارة" }
},
{ id: 48, section: "mojitos", icon: Martini, price: 0,
  name: { en: "Soda Tonic Mojito", ar: "موهيتو صودا تونك" },
  desc: { en: "Refreshing mint & lime with tonic water",
          ar: "نعناع وليمون مع تونك ووتَر منعش" }
},
/* SOFT DRINKS & WATER */
{ id: 900, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Pepsi", ar: "بيبسي" },
  desc: { en: "Classic cola soft drink", ar: "مشروب غازي كلاسيكي" }
},
{ id: 901, section: "soft", icon: CupSoda, price: 0,
  name: { en: "7Up", ar: "سفن أب" },
  desc: { en: "Lemon-lime soft drink", ar: "مشروب غازي بالليمون" }
},
{ id: 902, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Miranda", ar: "ميرندا" },
  desc: { en: "Orange flavored soda", ar: "مشروب غازي برتقال" }
},
{ id: 903, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Schweppes Gold", ar: "شويبس جولد" },
  desc: { en: "Sparkling malt drink", ar: "مشروب غازي بنكهة المالت" }
},
{ id: 904, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Mountain Dew", ar: "ماونتن ديو" },
  desc: { en: "Citrus-flavored soda", ar: "مشروب غازي بنكهة الحمضيات" }
},
{ id: 905, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Fayrouz", ar: "فيروز" },
  desc: { en: "Fruit-flavored malt soda", ar: "مشروب غازي بنكهة الفواكه" }
},
{ id: 906, section: "soft", icon: CupSoda, price: 0,
  name: { en: "V7", ar: "ڤي 7" },
  desc: { en: "Refreshing carbonated drink", ar: "مشروب غازي منعش" }
},
{ id: 907, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Birell", ar: "بيريل" },
  desc: { en: "Non-alcoholic malt beverage", ar: "مشروب مالت خالي من الكحول" }
},
{ id: 908, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Twist", ar: "تويست" },
  desc: { en: "Fruit soda mix", ar: "مشروب غازي بالفواكه" }
},
{ id: 909, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Mineral Water (Small)", ar: "مياه معدنية (صغيرة)" },
  desc: { en: "Refreshing bottled water", ar: "مياه معدنية منعشة" }
},
{ id: 910, section: "soft", icon: CupSoda, price: 0,
  name: { en: "Mineral Water (Large)", ar: "مياه معدنية (كبيرة)" },
  desc: { en: "Large bottled water", ar: "زجاجة مياه معدنية كبيرة" }
},


/* SMOOTHIES */
{ id: 300, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Orange Smoothie", ar: "سموزي برتقال" },
  desc: { en: "Refreshing citrus blend", ar: "خليط حمضي منعش" }
},
{ id: 301, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Mango Smoothie", ar: "سموزي مانجا" },
  desc: { en: "Ripe mango smoothie", ar: "سموزي مانجو ناضجة" }
},
{ id: 302, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Guava Smoothie", ar: "سموزي جوافة" },
  desc: { en: "Fragrant guava blend", ar: "خليط جوافة عطري" }
},
{ id: 303, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Strawberry Smoothie", ar: "سموزي فراولة" },
  desc: { en: "Fresh strawberry smoothie", ar: "سموزي فراولة طازجة" }
},
{ id: 304, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Watermelon Smoothie", ar: "سموزي بطيخ" },
  desc: { en: "Summer favorite smoothie", ar: "سموزي منعش صيفي" }
},
{ id: 305, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Cantaloupe Smoothie", ar: "سموزي كانتالوب" },
  desc: { en: "Sweet melon smoothie", ar: "سموزي شمام حلو" }
},
{ id: 306, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Lemon Smoothie", ar: "سموزي ليمون" },
  desc: { en: "Tangy lemon smoothie", ar: "سموزي ليمون حمضي" }
},
{ id: 307, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Lemon Mint Smoothie", ar: "سموزي ليمون نعناع" },
  desc: { en: "Cool lemon & mint blend", ar: "خليط ليمون ونعناع منعش" }
},
{ id: 308, section: "smoothies", icon: Snowflake, price: 0,
  name: { en: "Blueberry Smoothie", ar: "سموزي بلو بيري" },
  desc: { en: "Blueberry smoothie", ar: "سموزي توت أزرق" }
},


/* FRESH JUICES */
{ id: 400, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Mango Juice", ar: "عصير مانجو" },
  desc: { en: "Fresh ripe mango juice", ar: "عصير مانجو طازج" }
},
{ id: 401, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Dates with Milk", ar: "بلح باللبن" },
  desc: { en: "Natural dates blended with milk", ar: "بلح طبيعي مع لبن" }
},
{ id: 402, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Lemon Juice", ar: "عصير ليمون" },
  desc: { en: "Refreshing lemon juice", ar: "عصير ليمون منعش" }
},
{ id: 403, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Lemon Mint Juice", ar: "عصير ليمون نعناع" },
  desc: { en: "Cool lemon & mint blend", ar: "خليط ليمون ونعناع منعش" }
},
{ id: 404, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Banana with Milk", ar: "موز باللبن" },
  desc: { en: "Creamy banana milkshake style", ar: "موز مع لبن كريمي" }
},
{ id: 405, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Guava Juice", ar: "عصير جوافة" },
  desc: { en: "Fresh guava juice", ar: "عصير جوافة طازج" }
},
{ id: 406, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Guava with Milk", ar: "جوافة باللبن" },
  desc: { en: "Guava blended with milk", ar: "جوافة مع لبن" }
},
{ id: 407, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Piña Colada", ar: "بيناكولادا" },
  desc: { en: "Pineapple & coconut blend", ar: "خليط أناناس وجوز هند" }
},
{ id: 408, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Cocktail Gold (Signature)", ar: "كوكتيل جولد (المميز)" },
  desc: { en: "House signature mix", ar: "المشروب المميز الخاص بالمكان" }
},
{ id: 409, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Red & White", ar: "رد أند وايت" },
  desc: { en: "Special layered juice", ar: "عصير مميز بطبقتين" }
},
{ id: 410, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Cantaloupe Juice", ar: "عصير كانتالوب" },
  desc: { en: "Fresh cantaloupe juice", ar: "عصير شمام طازج" }
},
{ id: 411, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Orange Juice", ar: "عصير برتقال" },
  desc: { en: "Freshly squeezed orange", ar: "برتقال معصور طازج" }
},
{ id: 412, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Strawberry Juice", ar: "عصير فراولة" },
  desc: { en: "Fresh strawberry juice", ar: "عصير فراولة طازج" }
},
{ id: 413, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Kiwi with Orange Juice", ar: "كيوي بالبرتقال" },
  desc: { en: "Kiwi blended with orange", ar: "كيوي مع برتقال" }
},
{ id: 414, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Watermelon Juice", ar: "عصير بطيخ" },
  desc: { en: "Refreshing watermelon juice", ar: "عصير بطيخ منعش" }
},
{ id: 415, section: "fresh", icon: CupSoda, price: 0,
  name: { en: "Florida Juice", ar: "فلوريدا" },
  desc: { en: "Mixed tropical Florida style juice", ar: "عصير كوكتيل فلوريدا الاستوائي" }
},

/* YOGURT MIXES */
{ id: 500, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Mango Yogurt", ar: "زبادي مانجا" },
  desc: { en: "Yogurt blended with mango", ar: "زبادي ممزوج بالمانجا" }
},
{ id: 501, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Strawberry Yogurt", ar: "زبادي فراولة" },
  desc: { en: "Yogurt blended with strawberries", ar: "زبادي ممزوج بالفراولة" }
},
{ id: 502, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Yogurt with Honey", ar: "زبادي عسل" },
  desc: { en: "Plain yogurt topped with honey", ar: "زبادي سادة مع عسل" }
},
{ id: 503, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Berry Yogurt", ar: "زبادي توت" },
  desc: { en: "Yogurt with mixed berries", ar: "زبادي مع توت مشكل" }
},
{ id: 504, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Peach Yogurt", ar: "زبادي خوخ" },
  desc: { en: "Yogurt with peach flavor", ar: "زبادي بنكهة الخوخ" }
},
{ id: 505, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Coconut Yogurt with Nuts", ar: "زبادي جوز هند بالمكسرات" },
  desc: { en: "Coconut yogurt topped with nuts", ar: "زبادي جوز هند مع مكسرات" }
},
{ id: 506, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Kiwi Yogurt", ar: "زبادي كيوي" },
  desc: { en: "Yogurt with kiwi flavor", ar: "زبادي بنكهة الكيوي" }
},
{ id: 507, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Heart Smart (Plain / Strawberry Sauce)", ar: "هارت سمارت (سادة أو بصوص فراولة)" },
  desc: { en: "Healthy yogurt option", ar: "خيار صحي من الزبادي" }
},
{ id: 508, section: "yogurt", icon: Milk, price: 0,
  name: { en: "Fruit Yogurt", ar: "زبادي فواكه" },
  desc: { en: "Yogurt with seasonal fruits", ar: "زبادي مع فواكه موسمية" }
},

/* DESSERTS */
{ id: 200, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Cheesecake", ar: "تشيز كيك" },
  desc: { en: "Classic baked cheesecake", ar: "تشيز كيك كلاسيكي" }
},
{ id: 201, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Molten Cake", ar: "مولتن كيك" },
  desc: { en: "Warm chocolate cake with lava center", ar: "كيك شوكولاتة بقلب سائل" }
},
{ id: 202, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Chocolate Cake", ar: "تشوكلت كيك" },
  desc: { en: "Rich layered chocolate cake", ar: "كيك شوكولاتة غني" }
},
{ id: 203, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Fudge", ar: "فادج" },
  desc: { en: "Dense chocolate fudge", ar: "فادج شوكولاتة كثيف" }
},
{ id: 204, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Brownies", ar: "براونيز" },
  desc: { en: "Classic chewy brownies", ar: "براونيز كثيفة وقابلة للمضغ" }
},
{ id: 205, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Fruit Salad", ar: "فروت سالاد" },
  desc: { en: "Fresh seasonal fruits", ar: "فواكه موسمية طازجة" }
},
{ id: 206, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Oreo Madness", ar: "أوريو مادنس" },
  desc: { en: "Oreo cookies & cream dessert", ar: "تحلية أوريو كوكيز آند كريم" }
},
{ id: 207, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Banana Split", ar: "بانانا سبليت" },
  desc: { en: "Banana, ice cream & toppings", ar: "موز مع آيس كريم وتوبينج" }
},
{ id: 208, section: "desserts", icon: Utensils, price: 0,
  name: { en: "Umm Ali", ar: "أم علي" },
  desc: { en: "Traditional Egyptian bread pudding", ar: "التحلية المصرية التقليدية" }
},

/* ICE CREAM */
{ id: 220, section: "desserts", icon: IceCream, price: 0,
  name: { en: "Ice Cream (1 Scoop)", ar: "آيس كريم (بولة واحدة)" },
  desc: { en: "Single scoop choice of flavor", ar: "بولة واحدة من اختيارك" }
},
{ id: 221, section: "desserts", icon: IceCream, price: 0,
  name: { en: "Ice Cream (2 Scoops)", ar: "آيس كريم (بوليْن)" },
  desc: { en: "Two scoops choice of flavor", ar: "بوليْن من اختيارك" }
},
{ id: 222, section: "desserts", icon: IceCream, price: 0,
  name: { en: "Ice Cream (3 Scoops)", ar: "آيس كريم (ثلاث بُوَل)" },
  desc: { en: "Three scoops choice of flavor", ar: "ثلاث بُوَل من اختيارك" }
},

  /* EXTRAS (from photo “Extra”) */
  { id:120, section: "extras", icon: Milk, price: 0, name: { en: "Milk", ar: "لبن" }, desc: { en: "Add to drinks", ar: "إضافة للمشروبات" }},
  { id:121, section: "extras", icon: Milk, price: 0, name: { en: "Lemon Slices", ar: "شرائح ليمون" }, desc: { en: "Fresh lemon", ar: "ليمون طازج" }}, /* handwriting said تقطيع ليمون? */
  { id:122, section: "extras", icon: Milk, price: 0, name: { en: "Chocolate Sauce", ar: "صوص شوكولاتة" }, desc: { en: "Drizzle", ar: "للزينة" }}, /* TODO confirm */
  { id:123, section: "extras", icon: Milk, price: 0, name: { en: "Caramel Sauce", ar: "صوص كراميل" }, desc: { en: "Drizzle", ar: "للزينة" }},
  { id:124, section: "extras", icon: Milk, price: 0, name: { en: "Ice Cream Scoop", ar: "آيس كريم" }, desc: { en: "Add a scoop", ar: "إضافة سكوب" }},
];

/* ---------------------------- COMPONENT ------------------------------- */
export default function CafeMenu() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const T = STR[lang];

  const grouped = useMemo(() => {
    const map = Object.fromEntries(SECTIONS.map(s => [s.id, []]));
    ITEMS.forEach((it) => map[it.section]?.push(it));
    return map;
  }, []);

  const sectionRefs = useRef(Object.fromEntries(SECTIONS.map(s => [s.id, null])));
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.getAttribute("data-id") || SECTIONS[0].id);
      },
      { root: null, rootMargin: "-120px 0px -60% 0px", threshold: [0, 0.3, 0.6] }
    );
    Object.values(sectionRefs.current).forEach((n) => n && observer.observe(n));
    return () => observer.disconnect();
  }, [lang]);

  const scrollTo = (id) => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const Section = ({ id, children }) => (
    <section
      ref={(el) => (sectionRefs.current[id] = el)}
      data-id={id}
      className="scroll-mt-28"
    >
      {children}
    </section>
  );

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={`${dark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"} min-h-screen`}>
      {/* HEADER */}
<header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur border-b border-yellow-500/30 px-4 py-3">
  <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
    {/* logo + brand */}
    <div className="flex items-center gap-3">
      <img
        src="/logo.jpg"           // put your file at public/logo.png
        alt="Gold Lounge"
        className="h-16 w-16 rounded-full object-cover bg-white ring-2 ring-yellow-500"
      />
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-yellow-400">
          {lang === "en" ? "Gold Lounge" : "جولد لاونج"}
        </h1>
        <p className="text-xs text-neutral-300">{T.subtitle}</p>
      </div>
    </div>

    <div className="flex-1" />

    {/* controls */}
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="text-yellow-300 hover:text-yellow-200"
        onClick={() => setDark(v => !v)}
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={18}/> : <Moon size={18}/>} {T.theme}
      </Button>
      <Button
        variant="ghost"
        className="text-yellow-300 hover:text-yellow-200"
        onClick={() => setLang(l => (l === "en" ? "ar" : "en"))}
        aria-label="Toggle language"
      >
        <Languages size={18}/> {T.lang}
      </Button>
    </div>
  </div>

  {/* TABS */}
  <div className="max-w-6xl mx-auto mt-3 overflow-x-auto">
    <div className="flex gap-2 pb-2">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <Button
            key={s.id}
            variant="ghost"
            onClick={() => scrollTo(s.id)}
            className={[
              "whitespace-nowrap border",
              isActive
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-transparent text-yellow-300 border-yellow-700 hover:bg-yellow-600/10"
            ].join(" ")}
          >
            <s.icon
              size={16}
              className={`mr-2 ${isActive ? "text-black" : "text-yellow-400"}`}
            />
            {T.sections[s.id]}
          </Button>
        );
      })}
    </div>
  </div>

  <div className="max-w-6xl mx-auto text-[10px] text-neutral-300 mt-1">
    {T.waiterNote}
  </div>
</header>


      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {SECTIONS.map((s) => (
          <Section key={s.id} id={s.id}>
     {/* HERO */}
<div
  className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-neutral-800 mb-5 h-48 md:h-64 bg-black"
  style={{
    backgroundImage: `url(${s.hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    backgroundRepeat: "no-repeat"
  }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
    <s.icon className="text-yellow-400" />
    <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
      {T.sections[s.id]}
    </h2>
  </div>
</div>


            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {grouped[s.id].map((item) => (
                <motion.div key={item.id} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 250 }}>
                  <Card className="hover:shadow-lg">
                    <CardContent className="flex flex-col items-center text-center">
                      <div className="mb-3 p-3 rounded-full bg-yellow-500/10 border border-yellow-600/30">
                        <item.icon size={28} className="text-yellow-600" />
                      </div>
                      <h3 className="text-xl font-semibold">{item.name[lang]}</h3>
                      {item.desc && <p className="opacity-70 mt-2">{item.desc[lang]}</p>}
                      <div className="mt-3 text-lg font-bold">{STR[lang].price(item.price || 0)}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Section>
        ))}

        <div className="mt-12 text-center">
          <Button className="gap-2">
            {T.explore}
          </Button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 pb-10 text-center opacity-70">
        <p>
          &copy; 2025 Pixel Digital Marketing Agency. All rights reserved.
          <br />
          {lang === "en"
            ? "Screen-reader friendly • RTL support in Arabic • Showcase only"
            : "ملائمة لقارئ الشاشة • دعم الاتجاه من اليمين لليسار • للعرض فقط"}
        </p>
      </footer>
    </div>
  );
}
