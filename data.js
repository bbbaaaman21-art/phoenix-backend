const PRODUCTS = [
    /* ============= 1 — units_table (ترابيزة + وحدات) ============= */
    {
      id: 1,
      name: "ترابيزة + وحدات مودرن NO-TT1",
      price: 7400,
      oldPrice: 8500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_table",
      image: "/uploads/tt/tt1.webp",
    imageWebp: "/uploads/tt/tt1-l.webp",
      description: "ترابيزة مع وحدة تليفزيون مودرن تناسب غرف المعيشة الصغيرة والمتوسطة.",
      dimensions: "العرض 180 سم × الارتفاع 40 سم × العمق 30 سم ابعاد الترابيزة : العرض 90 سم × الارتفاع 45 سم × العمق 50 سم ",
       
      colors: [
        { name: "أبيض × خشبي", codes: ["#b98d58" , "#f5f5f5"] },
        {  name: "أبيض × اسود", codes: ["#333333" , "#f5f5f5"]  },
        { name: "خشبي غامق", codes: "#8b5a2b" }
      ]
    },
    {
      id: 2,
      name: "ترابيزة + وحدات مودرن NO-TT2",
      price: 7600,
       bestSeller: true,
      oldPrice: 8700,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_table",
     image: "/uploads/tt/tt2.webp",
    imageWebp: "/uploads/tt/tt2-l.webp",
      bestSeller: true,
      description: "   وحدة تليفزيون مودرن مع ترابيزة قهوة .",
      dimensions: "العرض 120 سم × الارتفاع 40 سم × العمق 30 سم ابعاد الترابيزة : العرض 90 سم × الارتفاع 35 سم × العمق 50 سم ",
      colors: [
        { name: "أبيض × اسود", codes: ["#333333" , "#ffffff"] },
        { name: "أبيض × خشبي", codes: ["#b98d58" , "#f5f5f5"] },
        { name: "رمادي غامق", codes: "#555555" }
      ]
    },
    {
      id: 3,
      name: "ترابيزة + وحدات مودرن NO-TT3",
      price: 9500,
      bestSeller: true,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      oldPrice: 11400,
      hasMeters: false,
      rating: 5,
      category: "units_table",
      image: "/uploads/tt/tt3.webp",
    imageWebp: "/uploads/tt/tt3-l.webp",
      bestSeller: true,
      description: "وحدة تليفزيون مودرن مع وحدة جانبية لاضافة شكل رائع مع ترابيزة منخفضة لاضافة لمسه فنيه للشكل النهائي للعرض .",
      dimensions: "العرض 160 سم × الارتفاع 45 سم × العمق 35 سم ابعاد الترابيزة :- العرض 90 سم × الارتفاع 40 سم × العمق 50 سم  ابعاد الوحدة الجانبيه :- العرض 40 سم × الارتفاع 80 سم × العمق 35سم",
      colors: [
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "أبيض مطفي", codes: "#f7f7f7" },
        { name: "أسود", codes: "#222222" }
      ]
    },
    {
      id: 4,
      name: "ترابيزة + وحدات مودرن NO-TT4",
      price: 7400,
      bestSeller: true,
      oldPrice: 8500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_table",
      image: "/uploads/tt/tt4.webp",
    imageWebp: "/uploads/tt/tt4-l.webp",
      description: "ترابيزة مع وحدة تليفزيون مودرن تناسب غرف المعيشة الصغيرة والمتوسطة.",
      dimensions: "العرض 180 سم × الارتفاع 40 سم × العمق 30 سم ابعاد الترابيزة : العرض 90 سم × الارتفاع 45 سم × العمق 50 سم ",
       
      colors: [
        { name: "أبيض × خشبي", codes: ["#b98d58" , "#f5f5f5"] },
        {  name: "أبيض × اسود", codes: ["#333333" , "#f5f5f5"]  },
        { name: "خشبي غامق", codes: "#8b5a2b" }
      ]
    },
    {
      id: 5,
      name: "ترابيزة + وحدات مودرن NO-TT5",
      price: 7600,
      bestSeller: true,
      oldPrice: 8700,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_table",
      image: "/uploads/tt/tt5.webp",
    imageWebp: "/uploads/tt/tt5-l.webp",
      bestSeller: true,
      description: "   وحدة تليفزيون مودرن مع ترابيزة قهوة .",
      dimensions: "العرض 120 سم × الارتفاع 40 سم × العمق 30 سم ابعاد الترابيزة : العرض 90 سم × الارتفاع 35 سم × العمق 50 سم ",
      colors: [
        { name: "أبيض × اسود", codes: ["#333333" , "#ffffff"] },
        { name: "أبيض × خشبي", codes: ["#b98d58" , "#f5f5f5"] },
        { name: "رمادي غامق", codes: "#555555" }
      ]
    },
    {
      id: 6,
      name: "ترابيزة + وحدات مودرن NO-TT6",
      price: 9500,
      bestSeller: true,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      oldPrice: 11400,
      hasMeters: false,
      rating: 5,
      category: "units_table",
      image: "/uploads/tt/tt6.webp",
    imageWebp: "/uploads/tt/tt6-l.webp",
      bestSeller: true,
      description: "وحدة تليفزيون مودرن مع وحدة جانبية لاضافة شكل رائع مع ترابيزة منخفضة لاضافة لمسه فنيه للشكل النهائي للعرض .",
      dimensions: "العرض 160 سم × الارتفاع 45 سم × العمق 35 سم ابعاد الترابيزة :- العرض 90 سم × الارتفاع 40 سم × العمق 50 سم  ابعاد الوحدة الجانبيه :- العرض 40 سم × الارتفاع 80 سم × العمق 35سم",
      colors: [
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "أبيض مطفي", codes: "#f7f7f7" },
        { name: "أسود", codes: "#222222" }
      ]
    },
    {
      id: 7,
      name: "ترابيزة + وحدات مودرن NO-TT7",
      price: 9100,
      bestSeller: true,
      oldPrice: 11000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_table",
      image: "/uploads/tt/tt7.webp",
    imageWebp: "/uploads/tt/tt7-l.webp",
      description: "وحدة تليفزيون + ترابيزة مع ارجل معدنية و ادراج داخلية .",
      dimensions: "العرض 180 سم × الارتفاع 45 سم × العمق 35 سم ابعاد الترابيزة :- العرض 90 سم × الارتفاع 40 سم × العمق 50 سم ",
      colors: [
        { name: "أبيض  ", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" },
        { name: "رمادي غامق", codes: "#4b4b4b" }
      ]
    },
    {
      id: 8,
      name: "ترابيزة + وحدات مودرن NO-TT8",
      price: 9400,
      oldPrice: 11200,
      hasMeters: false,
       bestSeller: true,
      rating: 5,
      badge: "تخفيضات",
      category: "units_table",
      image: "/uploads/tt/tt8.webp",
    imageWebp: "/uploads/tt/tt8-l.webp",
      description: "ترابيزة تلفزيون قابلة للسحب مع ترابيزة قابلة للسحب وتغير الحجم .",
      dimensions: "العرض 160 سم × الارتفاع 45 سم × العمق 35 سم ابعاد الترابيزة :- العرض 100 سم × الارتفاع 45 سم × العمق 50 سم",
      colors: [
        { name: "أبيض × خشبي", codes: ["#b98d58" , "#f5f5f5"] },
        {  name: "أبيض × اسود", codes: ["#333333" , "#f5f5f5"]  },
        {  name: "خشبي × اسود", codes: ["#333333" , "#d5b28a"]  }
      ]
    },
    {
      id: 9,
      name: "ترابيزة + وحدات مودرن NO-TT9",
      price: 10000,
      oldPrice: 12000,
      hasMeters: false,
       bestSeller: true,
      rating: 4,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_table",
      image: "/uploads/tt/tt9.webp",
    imageWebp: "/uploads/tt/tt9-l.webp",
      bestSeller: true,
      description: "وحدة تليفزيون قابلة للسحب مع زجاج مطبوع علي شكل رخام مع ترابيزة   .",
      dimensions: " العرض 160 سم × الارتفاع 45 سم × العمق 35 سم ابعاد الترابيزة:- العرض 80 سم × الارتفاع 45 سم × العمق 50 سم ",
      colors: [
        { name: "أبيض مطفي", codes: "#ffffff" },
        { name: "رمادي فاتح", codes: "#979696" },
        { name: "اسود ", codes: "#333333" },
      ]
    },
    {
      id:10,
      name: "ترابيزة + وحدات مودرن NO-TT10",
      price: 8900,
      oldPrice: 10100,
      hasMeters: false,
       bestSeller: true,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_table",
      image: "/uploads/tt/tt10.webp",
    imageWebp: "/uploads/tt/tt10-l.webp",
      bestSeller: true,
      description: "وحدة  تلفزيون منخفضة مع شكل رائع وترابيزة قهوة بأدراج.",
      dimensions: "العرض 180 سم × الارتفاع 30 سم × العمق 40 سم ابعاد الترابيزة :- العرض 90 سم × الارتفاع 30 سم × العمق 50 سم",
      colors: [
        { name: "خشبي داكن", codes: "#6b4226" },
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333333" },
        
      ]
    },
  
    /* ============= 2 — dressing (دريسنج) ============= */
    {
      id: 11,
      name: "دريسنج مودرن NO-D1",
      price: 18200,
      oldPrice: 22000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "dressing",
      image: "/uploads/dr/d1.webp",
    imageWebp: "/uploads/dr/d1-l.webp",
      bestSeller: true,
      description: "دريسنج بأبواب مفصلي مع أرفف داخلية لتعليق وتخزين الملابس.(ملحوظة :- يمكن تغير المقاسات والالوان حسب غرفتك )",
      dimensions: "العرض 180 سم × الارتفاع 220 سم × العمق 50 سم",
      colors: [
        { name: "ازرق دكو × خشبي", codes: ["#DEB887", "#2B435C"]},
        { name: " ازرق دكو", codes: "#2B435C" },
        { name: " خشبي", codes: "#DEB887" }
      ]
    },
    {
      id: 12,
      name: "دريسنج مودرن NO-D2",
      price: 11200,
      oldPrice: 13500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "dressing",
      image: "/uploads/dr/d2.webp",
    imageWebp: "/uploads/dr/d2-l.webp",
      description: "دريسنج بثلاثة دلفة مناسب لجميع انواع الملابس مع وجود شمعات داخلية مع وجود ثاثة ادراج لتخزين الاكسسوارات  .(ملحوظة :- يمكن تغير المقاسات والالوان حسب غرفتك) ",
      dimensions: "العرض 120 سم × الارتفاع 210 سم × العمق 50 سم",
      colors: [
        { name: " اسود", codes: "#333333d1" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#8b5a2b" },
        
      ]
    },
    {
      id: 13,
      name: "دريسنج مودرن NO-D3",
      price: 10900,
      oldPrice: 13100,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "dressing",
      image: "/uploads/dr/d3.webp",
    imageWebp: "/uploads/dr/d3-l.webp",
      bestSeller: true,
      description: "دريسنج اتنين دلفة من خشب الMDF عالي الجودة. (ملحوظة :- يمكن تغير المقاسات والالوان حسب غرفتك)",
      dimensions: "العرض 120 سم × الارتفاع 200 سم × العمق 50 سم",
      colors: [
        { name: " خشبي", codes: "#DEB887" },
        { name: "أبيض ", codes: "#ffffff" },
        { name: "اسود رمادي", codes: "#333333d1" }
      ]
    },
    {
      id: 14,
      name: "دريسنج مودرن NO-D4",
      price: 7200,
      hasMeters: false,
      category: "dressing",
      image: "/uploads/dr/d4.webp",
    imageWebp: "/uploads/dr/d4-l.webp",
      description: "دريسنج بأبواب مفصلية مع تقسيم داخلي متنوع للأحذية والحقائب.",
      dimensions: "العرض 190 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي غامق", codes: "#555555" }
      ]
    },
    {
      id: 15,
      name: "دريسنج مودرن NO-D4",
      price: 7700,
      hasMeters: false,
      category: "dressing",
      image: "/uploads/dr/d5.webp",
    imageWebp: "/uploads/dr/d5-l.webp",
      description: "تصميم عملي مع أرفف مفتوحة لسهولة الوصول للأغراض اليومية.",
      dimensions: "العرض 210 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" }
      ]
    },
    {
      id: 16,
      name: "دريسنج مودرن NO-D6",
      price: 11000,
      oldPrice: 13500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "dressing",
      image: "/uploads/dr/d6.webp",
    imageWebp: "/uploads/dr/d6-l.webp",
      description: "دريسنج اتنين دلفة جرار من خشب الMDF عالي الجودة .(ملحوظة :- يمكن تغير المقاسات والالوان حسب غرفتك)",
      dimensions: "العرض 120 سم × الارتفاع 200 سم × العمق 50 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود ", codes: "#333333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 17,
      name: "دريسنج مودرن NO-D7",
      price: 7350,
      hasMeters: false,
      category: "dressing",
      image: "/uploads/dr/d7.webp",
    imageWebp: "/uploads/dr/d7-l.webp",
      description: "خزانة ملابس كبيرة مع مساحة إضافية للأدراج والإكسسوارات.",
      dimensions: "العرض 200 سم × الارتفاع 220 سم × العمق 58 سم",
      colors: [
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d9b48f" }
      ]
    },
    {
      id: 18,
      name: "دريسنج مودرن NO-D8",
      price: 7700,
      hasMeters: false,
      category: "dressing",
      image: "/uploads/dr/d8.webp",
    imageWebp: "/uploads/dr/d8-l.webp",
      description: "تصميم عملي مع أرفف مفتوحة لسهولة الوصول للأغراض اليومية.",
      dimensions: "العرض 210 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" }
      ]
    },
    {
      id: 19,
      name: "دريسنج مودرن NO-D9",
      price: 11000,
      oldPrice: 13500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "dressing",
      image: "/uploads/dr/d9.webp",
    imageWebp: "/uploads/dr/d9-l.webp",
      description: "دريسنج اتنين دلفة جرار من خشب الMDF عالي الجودة .(ملحوظة :- يمكن تغير المقاسات والالوان حسب غرفتك)",
      dimensions: "العرض 120 سم × الارتفاع 200 سم × العمق 50 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود ", codes: "#333333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 20,
      name: "دريسنج مودرن NO-D10",
      price: 7350,
      hasMeters: false,
      bestSeller: true,
      category: "dressing",
      image: "/uploads/dr/d10.webp",
    imageWebp: "/uploads/dr/d10-l.webp",
      description: "خزانة ملابس كبيرة مع مساحة إضافية للأدراج والإكسسوارات.",
      dimensions: "العرض 200 سم × الارتفاع 220 سم × العمق 58 سم",
      colors: [
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d9b48f" }
      ]
    },
    /* ============= 3 — buffet (بوفيه) ============= */
    {
      id: 21,
      name: "بوفيه مودرن NO-BU1",
      price: 4100,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b1.webp",
    imageWebp: "/uploads/bu/b1-l.webp",
      description: "بوفيه مودرن بغرف تخزين وأرفف لعرض الديكور وأطقم الطعام.",
      dimensions: "العرض 140 سم × الارتفاع 80 سم × العمق 45 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#d7d7d7" }
      ]
    },
    {
      id: 22,
      name: "بوفيه مودرن NO-BU2",
      price: 4500,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b2.webp",
    imageWebp: "/uploads/bu/b2-l.webp",
      description: "بوفيه بأبواب زجاجية لعرض الكؤوس والأطباق بشكل أنيق.",
      dimensions: "العرض 150 سم × الارتفاع 85 سم × العمق 45 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي متوسط", codes: "#b07a4a" },
        { name: "رمادي غامق", codes: "#555555" }
      ]
    },
    {
      id: 23,
      name: "بوفيه مودرن NO-BU3",
      price: 4700,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b3.webp",
    imageWebp: "/uploads/bu/b3-l.webp",
      description: "بوفيه بخطوط مستقيمة يناسب غرف السفرة المودرن.",
      dimensions: "العرض 160 سم × الارتفاع 85 سم × العمق 45 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 24,
      name: "بوفيه مودرن NO-BU4",
      price: 4300,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b4.webp",
    imageWebp: "/uploads/bu/b4-l.webp",
      description: "بوفيه مع أدراج متعددة لتخزين المفارش والأدوات.",
      dimensions: "العرض 135 سم × الارتفاع 80 سم × العمق 42 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي فاتح", codes: "#d0d0d0" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 25,
      name: "بوفيه مودرن NO-BU5",
      price: 5200,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "buffet",
       image: "/uploads/bu/b5.webp",
    imageWebp: "/uploads/bu/b5-l.webp",
      bestSeller: true,
      description: "بوفيه فخم بسطح علوي واسع لعرض الإكسسوارات واللوحات.",
      dimensions: "العرض 170 سم × الارتفاع 90 سم × العمق 45 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 26,
      name: "بوفيه مودرن NO-BU6",
      price: 4900,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b6.webp",
    imageWebp: "/uploads/bu/b6-l.webp",
      description: "بوفيه بواجهة بسيطة وأرجل معدنية رفيعة لستايل عصري.",
      dimensions: "العرض 155 سم × الارتفاع 82 سم × العمق 44 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 27,
      name: "بوفيه مودرن NO-BU7",
      price: 4600,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b7.webp",
    imageWebp: "/uploads/bu/b7-l.webp",
      description: "بوفيه بحجم متوسط يناسب الشقق والمساحات المحدودة.",
      dimensions: "العرض 145 سم × الارتفاع 82 سم × العمق 42 سم",
      colors: [
        { name: "بيج فاتح", codes: "#ead8c0" },
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 28,
      name: "بوفيه مودرن NO-Bu8",
      price: 5200,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "buffet",
       image: "/uploads/bu/b8.webp",
    imageWebp: "/uploads/bu/b8-l.webp",
      bestSeller: true,
      description: "بوفيه فخم بسطح علوي واسع لعرض الإكسسوارات واللوحات.",
      dimensions: "العرض 170 سم × الارتفاع 90 سم × العمق 45 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 29,
      name: "بوفيه مودرن NO-BU9",
      price: 4900,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b9.webp",
    imageWebp: "/uploads/bu/b9-l.webp",
      description: "بوفيه بواجهة بسيطة وأرجل معدنية رفيعة لستايل عصري.",
      dimensions: "العرض 155 سم × الارتفاع 82 سم × العمق 44 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 30,
      name: "بوفيه مودرن NO-BU10",
      price: 4600,
      hasMeters: false,
      category: "buffet",
       image: "/uploads/bu/b10.webp",
    imageWebp: "/uploads/bu/b10-l.webp",
      description: "بوفيه بحجم متوسط يناسب الشقق والمساحات المحدودة.",
      dimensions: "العرض 145 سم × الارتفاع 82 سم × العمق 42 سم",
      colors: [
        { name: "بيج فاتح", codes: "#ead8c0" },
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
  
    /* ============= 4 — units_tv (وحدات تليفزيون) ============= */
    {
      id: 31,
      name: "وحدة تليفزيون NO-UT1",
      price: 4900,
      oldPrice: 6200,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
       image: "/uploads/tu/tu1.webp",
    imageWebp: "/uploads/tu/tu1-l.webp",
      description: "وحدة تليفزيون مرتفعة مع ادراج و ابعة دولف جانبية .",
      dimensions: "العرض 160 سم × الارتفاع 55 سم × العمق 40 سم",
      colors: [
        { name: "أبيض" / "رمادي", codes:[ "#676464" , "#ffffff" ] },
        { name: "أبيض" / "اسود", codes:[ "#333333" , "#ffffff" ] },
        { name: "خشبي فاتح", codes: "#d2b48c" }
      ]
    },
    {
      id: 32,
      name: "وحدة تليفزيون NO-UT2",
      price: 3900,
      oldPrice: 5200,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
         image: "/uploads/tu/tu2.webp",
    imageWebp: "/uploads/tu/tu2-l.webp",
      description: "وحدة تليفزيون مفتوحه مع دمج لون الخشب الطبيعي بها لاضافة لمسة فنية .",
      dimensions: "العرض 140 سم × الارتفاع 55 سم × العمق 30 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "رمادي غامق", codes: "#555555" },
        { name: " اسود", codes: "#333333" }
      ]
    },
    {
      id: 33,
      name: "وحدة تليفزيون NO-UT3",
      price: 4100,
      oldPrice: 5400,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
         image: "/uploads/tu/tu3.webp",
    imageWebp: "/uploads/tu/tu3-l.webp",
      description: "وحدة تلفزيون مع درج كبير الحجم بلون خشبي مدمج مع جميع الالوان لاضافة لمسة فنية و رف جانبي .",
      dimensions: "العرض 120 سم × الارتفاع 55 سم × العمق 35 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "أسود", codes: "#222222" },
        { name: "خشبي رمادي", codes: "#a68b6a" }
      ]
    },
    {
      id: 34,
      name: "وحدة تليفزيون NO-UT4",
      price: 10000,
      oldPrice: 12300,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
         image: "/uploads/tu/tu4.webp",
    imageWebp: "/uploads/tu/tu4-l.webp",
      description: "وحدة  تلفزيون ارضيه ووحدة جانبه واخري علوية  لتحيط بالشاشة مع امكانية تغير المقاسات حسب ابعاد الشاشة  .",
      dimensions: "العرض 160 سم × الارتفاع 40 سم × العمق 30 سم ابعاد الوحدة العلوية :-العرض 170سم × الارتفاع 20 سم × العمق 15 سم ابعاد الوحدة الجانبية :- العرض 30 سم × الارتفاع 100 سم × العمق 15 سم ",
      colors: [
        { name: "اسود", codes: "#333333" },
        { name: "أبيض مطفي", codes: "#ffffff" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 35,
      name: "وحدة تليفزيون NO-UT5",
      price: 4600,
      oldPrice:6100,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
         image: "/uploads/tu/tu5.webp",
    imageWebp: "/uploads/tu/tu5-l.webp",
      description: "وحدة تليفزيون كبيرة تناسب الشاشات حتى 75 بوصة و اكثر .",
      dimensions: "العرض 170 سم × الارتفاع 50 سم × العمق 30 سم",
      colors: [
        { name: " خشبي فاتح × رمادي", codes: ["#b3997cf7" , "#9e9e9e"] },
        { name: "أبيض × اسود", codes: ["#333333" ,"#ffffff"] },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 36,
      name: "وحدة تليفزيون NO-UT6",
      price: 4400,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_tv",
         image: "/uploads/tu/tu6.webp",
    imageWebp: "/uploads/tu/tu6-l.webp",
      bestSeller: true,
      description: "وحدة مرتفعة على أرجل خشبية تمنح سهولة في التنظيف أسفلها.",
      dimensions: "العرض 140 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي فاتح", codes: "#d5b28a" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 37,
      name: "وحدة تليفزيون NO-UT7",
      price: 5000,
      hasMeters: false,
      category: "units_tv",
         image: "/uploads/tu/tu7.webp",
    imageWebp: "/uploads/tu/tu7-l.webp",
      description: "تصميم أنيق مع وحدات تخزين مغلقة لحفظ الأشياء بعيدًا عن النظر.",
      dimensions: "العرض 175 سم × الارتفاع 52 سم × العمق 42 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 38,
      name: "وحدة تليفزيون NO-UT8",
      price: 4600,
      oldPrice:6100,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_tv",
         image: "/uploads/tu/tu8.webp",
    imageWebp: "/uploads/tu/tu8-l.webp",
      description: "وحدة تليفزيون كبيرة تناسب الشاشات حتى 75 بوصة و اكثر .",
      dimensions: "العرض 170 سم × الارتفاع 50 سم × العمق 30 سم",
      colors: [
        { name: " خشبي فاتح × رمادي", codes: ["#b3997cf7" , "#9e9e9e"] },
        { name: "أبيض × اسود", codes: ["#333333" ,"#ffffff"] },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 39,
      name: "وحدة تليفزيون NO-UT9",
      price: 4400,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_tv",
         image: "/uploads/tu/tu9.webp",
    imageWebp: "/uploads/tu/tu9-l.webp",
      bestSeller: true,
      description: "وحدة مرتفعة على أرجل خشبية تمنح سهولة في التنظيف أسفلها.",
      dimensions: "العرض 140 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي فاتح", codes: "#d5b28a" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 40,
      name: "وحدة تليفزيون NO-UT10",
      price: 5000,
      hasMeters: false,
      category: "units_tv",
         image: "/uploads/tu/tu10.webp",
    imageWebp: "/uploads/tu/tu10-l.webp",
      description: "تصميم أنيق مع وحدات تخزين مغلقة لحفظ الأشياء بعيدًا عن النظر.",
      dimensions: "العرض 175 سم × الارتفاع 52 سم × العمق 42 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي غامق", codes: "#7a4a2c" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    /* ============= 5 — units_ki (وحدات مطبخ) ============= */
    {
      id: 41,
      name: "وحدة مطبخ NO-uK1",
      price: 5400,
       hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      
      category: "units_ki",
       image: "/uploads/ki/ki1.webp",
    imageWebp: "/uploads/ki/ki1-l.webp",
      description: "وحدة مطبخ سفلية مع سطح عملي لتحضير الطعام.",
      dimensions: "العرض 160 سم × الارتفاع 90 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#d7d7d7" }
      ]
    },
    {
      id: 42,
      name: "وحدة مطبخ NO-uK2",
      price: 5200,
      
       hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      category: "units_ki",
       image: "/uploads/ki/ki2.webp",
    imageWebp: "/uploads/ki/ki2-l.webp",
      description: "وحدة مطبخ علوية وسفلية لتخزين الأواني والأطباق.",
      dimensions: "العرض 180 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي رمادي", codes: "#a68b6a" }
      ]
    },
    {
      id: 43,
      name: "وحدة مطبخ NO-uK3",
      price: 5800,
       hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      
      category: "units_ki",
       image: "/uploads/ki/ki3.webp",
    imageWebp: "/uploads/ki/ki3-l.webp",
      description: "تصميم على شكل حرف L مناسب للمطابخ المفتوحة.",
      dimensions: "الضلع الأول 200 سم × الضلع الثاني 160 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي غامق", codes: "#555555" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 44,
      name: "وحدة مطبخ NO-uK4",
      price: 6000,
       hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      
      category: "units_ki",
       image: "/uploads/ki/ki4.webp",
    imageWebp: "/uploads/ki/ki4-l.webp",
      description: "وحدة مطبخ مستقيمة مع مكان مخصص للفرن والبوتاجاز.",
      dimensions: "العرض 240 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 45,
      name: "وحدة مطبخ NO-uK5",
      price: 6300,
      
       hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      category: "units_ki",
       image: "/uploads/ki/ki5.webp",
    imageWebp: "/uploads/ki/ki5-l.webp",
      description: "مطابخ مودرن بواجهات سادة سهلة التنظيف.",
      dimensions: "العرض 260 سم × الارتفاع 230 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 46,
      name: "وحدة مطبخ NO-uK6",
      price: 4900,
      oldPrice: 5700,

 hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "units_ki",
       image: "/uploads/ki/ki6.webp",
    imageWebp: "/uploads/ki/ki6-l.webp",
      bestSeller: true,
      description: "وحدة مطبخ صغيرة تناسب المطابخ الضيقة والشقق الستوديو.",
      dimensions: "العرض 140 سم × الارتفاع 210 سم × العمق 55 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي فاتح", codes: "#d5b28a" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 47,
      name: "وحدة مطبخ NO-uK7",
      price: 5800,  
      category: "units_ki",
    
     hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
      image: "/uploads/ki/ki1.webp",
    imageWebp: "/uploads/ki/ki1.webp",
      description: "تصميم مطبخ مكون من وحدات منفصلة يمكن توزيعها حسب المساحة.",
      dimensions: "العرض الكلي 220 سم × الارتفاع 220 سم × العمق 60 سم",
      colors: [
        { name: "بيج فاتح", codes: "#ead8c0" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
  
  {
    id: 48,
    name: "وحدة مطبخ NO-uK8",
    price: 6300,
    category: "units_ki",
    
     hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
     image: "/uploads/ki/ki8.webp",
    imageWebp: "/uploads/ki/ki8-l.webp",
    description: "مطابخ مودرن بواجهات سادة سهلة التنظيف.",
    dimensions: "العرض 260 سم × الارتفاع 230 سم × العمق 60 سم",
    colors: [
      { name: "أبيض", codes: "#ffffff" },
      { name: "رمادي أُنثراسايت", codes: "#333333" },
      { name: "خشبي طبيعي", codes: "#c89b68" }
    ]
  },
  {
    id: 49,
    name: "وحدة مطبخ NO-uK9",
    price: 4900,
    oldPrice: 5700,
    rating: 5,
    badge: "تخفيضات",
    badge2: "الاكثر مبيعاً",
     hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
    category: "units_ki",
     image: "/uploads/ki/ki9.webp",
    imageWebp: "/uploads/ki/ki9-l.webp",
    bestSeller: true,
    description: "وحدة مطبخ صغيرة تناسب المطابخ الضيقة والشقق الستوديو.",
    dimensions: "العرض 140 سم × الارتفاع 210 سم × العمق 55 سم",
    colors: [
      { name: "أبيض مطفي", codes: "#f4f4f4" },
      { name: "خشبي فاتح", codes: "#d5b28a" },
      { name: "رمادي متوسط", codes: "#9e9e9e" }
    ]
  },
  {
    id: 50,
    name: "وحدة مطبخ NO-uK10",
    price: 4500,
    hasMeters: true ,// للمطبخ فقط  
    materials: [
      { name: "MDF-16", price: 5800 },
      { name: "Acrylic", price: 7500 }
    ],
    category: "units_ki",
     image: "/uploads/ki/ki10.webp",
    imageWebp: "/uploads/ki/ki10-l.webp",
    description: "تصميم مطبخ مكون من وحدات منفصلة يمكن توزيعها حسب المساحة.",
    dimensions: "العرض الكلي 220 سم × الارتفاع 220 سم × العمق 60 سم",
    colors: [
      { name: "بيج فاتح", codes: "#ead8c0" },
      { name: "أبيض", codes: "#ffffff" },
      { name: "خشبي متوسط", codes: "#b37b4b" }
    ]
  },

    /* ============= 6 — coffee_corner (كوفي كورنر) ============= */
    {
      id: 51,
      name: "كوفي كورنر NO-CO1",
      price: 3800,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co1.webp",
    imageWebp: "/uploads/co/co1-l.webp",
      description: "وحدة كوفي كورنر مع أرفف للأكواب والبن والماكينة.",
      dimensions: "العرض 90 سم × الارتفاع 160 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#d7d7d7" }
      ]
    },
    {
      id: 52,
      name: "كوفي كورنر NO-CO2",
      price: 4200,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co2.webp",
    imageWebp: "/uploads/co/co2-l.webp",
      description: "كوفي كورنر مودرن بسطح علوي واسع ومساحة للتخزين السفلي.",
      dimensions: "العرض 100 سم × الارتفاع 170 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: "رمادي غامق", codes: "#555555" },
        { name: "خشبي متوسط", codes: "#b07a4a" }
      ]
    },
    {
      id: 53,
      name: "كوفي كورنر NO-CO3",
      price: 3900,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co3.webp",
    imageWebp: "/uploads/co/co3-l.webp",
      description: "وحدة صغيرة تناسب الزوايا في غرف المعيشة أو المطبخ.",
      dimensions: "العرض 80 سم × الارتفاع 150 سم × العمق 38 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 54,
      name: "كوفي كورنر NO-CO4",
      price: 4500,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co4.webp",
    imageWebp: "/uploads/co/co4-l.webp",
      description: "كوفي كورنر بأرفف مفتوحة لتعليق الأكواب وإضافة ديكورات.",
      dimensions: "العرض 95 سم × الارتفاع 165 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 55,
      name: "كوفي كورنر NO-CO5",
      price: 4700,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "coffee_corner",
    image: "/uploads/co/co5.webp",
    imageWebp: "/uploads/co/co5-l.webp",
      bestSeller: true,
      description: "تصميم أنيق مع أبواب مغلقة للحفاظ على نظافة أدوات القهوة.",
      dimensions: "العرض 100 سم × الارتفاع 170 سم × العمق 42 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 56,
      name: "كوفي كورنر NO-CO6",
      price: 5200,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co6.webp",
    imageWebp: "/uploads/co/co6-l.webp",
      description: "وحدة كوفي كورنر كبيرة تناسب عشاق القهوة والضيافة.",
      dimensions: "العرض 120 سم × الارتفاع 180 سم × العمق 45 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "خشبي داكن", codes: "#7a4a2c" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 57,
      name: "كوفي كورنر NO-CO7",
      price: 4000,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co7.webp",
    imageWebp: "/uploads/co/co7-l.webp",
      description: "حجم متوسط مع تنظيم داخلي جيد للأكواب والعلب.",
      dimensions: "العرض 90 سم × الارتفاع 165 سم × العمق 40 سم",
      colors: [
        { name: "بيج فاتح", codes: "#ead8c0" },
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 58,
      name: "كوفي كورنر NO-CO8",
      price: 4700,
      hasMeters: false,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "coffee_corner",
    image: "/uploads/co/co8.webp",
    imageWebp: "/uploads/co/co8-l.webp",
      bestSeller: true,
      description: "تصميم أنيق مع أبواب مغلقة للحفاظ على نظافة أدوات القهوة.",
      dimensions: "العرض 100 سم × الارتفاع 170 سم × العمق 42 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 59,
      name: "كوفي كورنر NO-CO9",
      price: 5200,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co9.webp",
    imageWebp: "/uploads/co/co9-l.webp",
      description: "وحدة كوفي كورنر كبيرة تناسب عشاق القهوة والضيافة.",
      dimensions: "العرض 120 سم × الارتفاع 180 سم × العمق 45 سم",
      colors: [
        { name: "أبيض لامع", codes: "#ffffff" },
        { name: "خشبي داكن", codes: "#7a4a2c" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 60,
      name: "كوفي كورنر NO-CO10",
      price: 4000,
      hasMeters: false,
      category: "coffee_corner",
    image: "/uploads/co/co10.webp",
    imageWebp: "/uploads/co/co10-l.webp",
      description: "حجم متوسط مع تنظيم داخلي جيد للأكواب والعلب.",
      dimensions: "العرض 90 سم × الارتفاع 165 سم × العمق 40 سم",
      colors: [
        { name: "بيج فاتح", codes: "#ead8c0" },
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    /* ============= 7 — hairdo (تسريحة) ============= */
    {
      id: 61,
      name: "تسريحة مودرن NO-H1",
      price: 8100,
      oldPrice: 11400,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "hairdo",
       image: "/uploads/ha/h1.webp",
    imageWebp: "/uploads/ha/h1-l.webp",
      description: "تسريحة مع مرآة كبيرة وأدراج لتخزين مستحضرات التجميل.",
      dimensions: "العرض 90 سم × الارتفاع 20 سم × العمق 40 سم",
      colors: [
        { name: "رمادي × خشبي", codes: ["#808B96" , "#C19A6B"] },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي", codes: "#C19A6B" },
      ]
    },
    {
      id: 62,
      name: "تسريحة مودرن NO-H2",
      price: 10200,
      oldPrice: 12400,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "hairdo",
       image: "/uploads/ha/h2.webp",
    imageWebp: "/uploads/ha/h2-l.webp",
      bestSeller: true,
      description: "تسريحة بسيطة مع كرسي صغير ومساحة تخزين جانبية.",
      dimensions: "العرض 120 سم × الارتفاع 65 سم × العمق 40 سم",
      colors: [
        { name: "بني خشبي  × بيج", codes: ["#F5F5DC " , "#9d6f43"] },
        { name: "أبيض ", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#C19A6B" },
      ]
    },
    {
      id: 63,
      name: "تسريحة مودرن NO-H3",
      price: 14100,
      oldPrice: 16200,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h3.webp",
    imageWebp: "/uploads/ha/h3-l.webp",
      description: "تسريحة بمرآة مستطيلة وأدراج سفلية متعددة.",
      dimensions: "العرض 120 سم × الارتفاع 85 سم × العمق 40 سم",
      colors: [
        { name: "رمادي غامق", codes: "#555555" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 64,
      name: "تسريحة مودرن NO-H4",
      price: 10250,
      oldPrice: 12200,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h4.webp",
    imageWebp: "/uploads/ha/h4-l.webp",
      description: "تسريحة  بمرآة مستطيلة وأدراج سفلية متعددة ",
      dimensions: "العرض 110 سم × الارتفاع 75 سم × العمق 40 سم",
      colors: [
        { name: " اسود  × ابيض", codes: ["#333333 " , "#ffffff"] },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 65,
      name: "تسريحة مودرن NO-H5",
      price: 10500,
      oldPrice: 12700,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h5.webp",
    imageWebp: "/uploads/ha/h5-l.webp",
      description: "تسريحة بمرآة مستطيلة وأدراج سفلية متعددة مع كرسي مودرن.",
      dimensions: "العرض 110 سم × الارتفاع 75 سم × العمق 40 سم",
      colors: [
        { name: " اسود  × ابيض", codes: ["#5D6164  " , "#8D8B83 "] },
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي متوسط", codes: "#b07a4a" }
      ]
    },
    {
      id: 66,
      name: "تسريحة مودرن NO-H6",
      price: 3200,
      oldPrice: 12700,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h6.webp",
    imageWebp: "/uploads/ha/h6-l.webp",
      description: "تسريحة بمرآة دائرية ولمسة ديكورية عصرية.",
      dimensions: "العرض 100 سم × الارتفاع 165 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 67,
      name: "تسريحة مودرن NO-H7",
      price: 3000,
      hasMeters: false,
      category: "hairdo",
       image: "/uploads/ha/h7.webp",
    imageWebp: "/uploads/ha/h7-l.webp",
      description: "تسريحة بكرسي مبطن ومساحة تخزين مناسبة للاستخدام اليومي.",
      dimensions: "العرض 95 سم × الارتفاع 160 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "بيج", codes: "#e2c8a6" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 68,
      name: "تسريحة مودرن NO-H8",
      price: 10500,
      oldPrice: 12700,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h8.webp",
    imageWebp: "/uploads/ha/h8-l.webp",
      description: "تسريحة بمرآة مستطيلة وأدراج سفلية متعددة مع كرسي مودرن.",
      dimensions: "العرض 110 سم × الارتفاع 75 سم × العمق 40 سم",
      colors: [
        { name: " اسود  × ابيض", codes: ["#5D6164  " , "#8D8B83 "] },
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي متوسط", codes: "#b07a4a" }
      ]
    },
    {
      id: 69,
      name: "تسريحة مودرن NO-H9",
      price: 3200,
      oldPrice: 12700,
      hasMeters: false,
      rating: 5, 
      badge: "تخفيضات",
      category: "hairdo",
       image: "/uploads/ha/h9.webp",
    imageWebp: "/uploads/ha/h9-l.webp",
      description: "تسريحة بمرآة دائرية ولمسة ديكورية عصرية.",
      dimensions: "العرض 100 سم × الارتفاع 165 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#d0d0d0" }
      ]
    },
    {
      id: 70,
      name: "تسريحة مودرن NO-H10",
      price: 3000,
      hasMeters: false,
      category: "hairdo",
       image: "/uploads/ha/h10.webp",
    imageWebp: "/uploads/ha/h10-l.webp",
      description: "تسريحة بكرسي مبطن ومساحة تخزين مناسبة للاستخدام اليومي.",
      dimensions: "العرض 95 سم × الارتفاع 160 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "بيج", codes: "#e2c8a6" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
  
    /* ============= 8 — tables (ترابيزات) ============= */
    {
      id: 71,
      name: "ترابيزة NO-T1",
      price: 3650,
      oldPrice: 5600,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "tables",
        image: "/uploads/ta/t1.webp",
    imageWebp: "/uploads/ta/t1-l.webp",
      bestSeller: true,
      description: "ترابيزة قهوة مودرن بسطح مستطيل وحجم مناسب لغرف المعيشة.",
      dimensions: "العرض 90 سم × الارتفاع 45 سم × العمق 50 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" },
        { name: "رمادي فاتح", codes: "#818d9d" }
      ]
    },
    {
      id: 72,
      name: "ترابيزة NO-T2",
      price: 3800,
      oldPrice: 5600,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      badge2: "الاكثر مبيعاً",
      category: "tables",
        image: "/uploads/ta/t2.webp",
    imageWebp: "/uploads/ta/t2-l.webp",
      description: "ترابيزة قهوة مودرن  شكل رائع وجودة عالية .",
      dimensions: "العمق 50 سم × الارتفاع 45 سم × العرض 90 سم",
      colors: [
        { name: "رمادي ", codes: "#b9b4b4" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي متوسط", codes: "#b07a4a" }
      ]
    },
    {
      id: 73,
      name: "ترابيزة NO-T3",
      price: 3800,
      oldPrice: 5000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t3.webp",
    imageWebp: "/uploads/ta/t3-l.webp",
      description: "ترابيزة قهوة مكونة من مستويين لتخزين المجلات والريموت.",
      dimensions: "العرض 90 سم × الارتفاع 45 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: "رمادي غامق", codes: "#555555" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 74,
      name: "ترابيزة NO-T4",
      price: 3500,
      oldPrice: 4800,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t4.webp",
    imageWebp: "/uploads/ta/t4-l.webp",
      description: "ترابيزة بسيطة تناسب الديكورات الهادئة.",
      dimensions: "العرض 90 سم × الارتفاع 45 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × بيج", codes: ["#ead8c0", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 75,
      name: "ترابيزة NO-T5",
      price: 4000,
      oldPrice: 4900,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t5.webp",
    imageWebp: "/uploads/ta/t5-l.webp",
      description: "ترابيزة بسطح زجاجي تمنح لمسة فاخرة لغرفة المعيشة.",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × خشبي", codes: ["#d9b88c", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "اسود × خشبي", codes: ["#d9b88c", "#222222"]},
       
      ]
    },
    {
      id: 76,
      name: "ترابيزة NO-T6",
      price: 4500,
      oldPrice: 5400,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t6.webp",
    imageWebp: "/uploads/ta/t6-l.webp",
      description: "ترابيزة بسطح زجاجي تناسب الشرفات أو الكورنرات الجانبية او الغرف.",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × اسود", codes: ["#222222", "#ffffff"]},
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 77,
      name: "ترابيزة NO-T7",
      price: 4500,
      oldPrice: 5500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t7.webp",
    imageWebp: "/uploads/ta/t7-l.webp",
      description: "ترابيزة مودرن مع سطع زجاجي مطبوع شكل وتصميم رائع    .",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × خشبي ", codes: ["#c89b68", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 78,
      name: "ترابيزة NO-T8",
      price: 4000,
      oldPrice: 4900,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t8.webp",
    imageWebp: "/uploads/ta/t8-l.webp",
      description: "ترابيزة بسطح زجاجي تمنح لمسة فاخرة لغرفة المعيشة.",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × خشبي", codes: ["#d9b88c", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "اسود × خشبي", codes: ["#d9b88c", "#222222"]},
       
      ]
    },
    {
      id: 79,
      name: "ترابيزة NO-T9",
      price: 4500,
      oldPrice: 5400,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t9.webp",
    imageWebp: "/uploads/ta/t9-l.webp",
      description: "ترابيزة بسطح زجاجي تناسب الشرفات أو الكورنرات الجانبية او الغرف.",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × اسود", codes: ["#222222", "#ffffff"]},
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 80,
      name: "ترابيزة NO-T10",
      price: 4500,
      oldPrice: 5500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "tables",
        image: "/uploads/ta/t10.webp",
    imageWebp: "/uploads/ta/t10-l.webp",
      description: "ترابيزة مودرن مع سطع زجاجي مطبوع شكل وتصميم رائع    .",
      dimensions: "العرض 100 سم × الارتفاع 40 سم × العمق 50 سم",
      colors: [
        { name: "ابيض × خشبي ", codes: ["#c89b68", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
  
  
    /* ============= 9 — books (مكتبة) ============= */
    {
      id: 81,
      name: "مكتبة NO-B1",
      price: 6150,
      oldPrice: 8400,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l1.webp",
    imageWebp: "/uploads/li/l1-l.webp",
      description: "مكتبة حائطية بأرفف مفتوحة لعرض الكتب والإكسسوارات.",
      dimensions: "العرض 170 سم × الارتفاع 190 سم × العمق 30 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي ", codes: "#af8f65" },
        { name: "رمادي ", codes: "#797575" }
      ]
    },
    {
      id: 82,
      name: "مكتبة NO-B2",
      price: 4200,
      oldPrice: 7100,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l2.webp",
    imageWebp: "/uploads/li/l2-l.webp",
      description: "مكتبة مفتوحه بأرفف بشكل مودرن .",
      dimensions: "العرض 100 سم × الارتفاع 110 سم × العمق 30 سم",
      colors: [
        { name: "ابيض × خشبي", codes: ["#cba26d", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي ", codes: "#b07a4a" }
      ]
    },
    {
      id: 83,
      name: "مكتبة NO-B3",
      price: 4500,
      oldPrice: 7700,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l3.webp",
    imageWebp: "/uploads/li/l3-l.webp",
      description: "مكتبة بشكل هندسي عصري تناسب غرف المعيشة والمكاتب.",
      dimensions: "العرض 90 سم × الارتفاع 170 سم × العمق 30 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 84,
      name: "مكتبة NO-B4",
      price: 7500,
      oldPrice: 9000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l4.webp",
    imageWebp: "/uploads/li/l4-l.webp",
      description: "جزامه بثلاث ادراج معي مساحه تحزين كبيرة للاحذية  مع وجود ارفف.",
      dimensions: "العرض 100 سم × الارتفاع 120 سم × العمق 35 سم",
      colors: [
        { name: "ابيض × خشبي", codes: ["#c7b092", "#ffffff"]},
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 85,
      name: "مكتبة NO-B5",
      price: 2250,
      oldPrice: 4000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l5.webp",
    imageWebp: "/uploads/li/l5-l.webp",
      description: "مكتبة مكتبة عمودية , شكل رائع وتصميم مناسب للديكورات المختلفة .",
      dimensions: "العرض 40 سم × الارتفاع 180 سم × العمق 30 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333333" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 86,
      name: "مكتبة NO-B6",
      price: 3900,
      hasMeters: false,
      category: "books",
       image: "/uploads/li/l6.webp",
    imageWebp: "/uploads/li/l6-l.webp",
      description: "مكتبة بواجهات زجاجية لحماية الكتب من الأتربة.",
      dimensions: "العرض 100 سم × الارتفاع 200 سم × العمق 32 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "رمادي فاتح", codes: "#d0d0d0" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 87,
      name: "مكتبة NO-B7",
      price: 3100,
      oldPrice: 4300,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l7.webp",
    imageWebp: "/uploads/li/l7-l.webp",
      description: "مكتبة أنيقة بترتيب أرفف غير تقليدي للديكور والكتب.",
      dimensions: "العرض 100 سم × الارتفاع 100 سم × العمق 25 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "بيج", codes: "#e2c8a6" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 88,
      name: "مكتبة NO-B8",
      price: 2250,
      oldPrice: 4000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l8.webp",
    imageWebp: "/uploads/li/l8-l.webp",
      description: "مكتبة مكتبة عمودية , شكل رائع وتصميم مناسب للديكورات المختلفة .",
      dimensions: "العرض 40 سم × الارتفاع 180 سم × العمق 30 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333333" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 89,
      name: "مكتبة NO-B9",
      price: 3900,
      hasMeters: false,
      category: "books",
       image: "/uploads/li/l9.webp",
    imageWebp: "/uploads/li/l9-l.webp",
      description: "مكتبة بواجهات زجاجية لحماية الكتب من الأتربة.",
      dimensions: "العرض 100 سم × الارتفاع 200 سم × العمق 32 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "رمادي فاتح", codes: "#d0d0d0" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 90,
      name: "مكتبة NO-B10",
      price: 3100,
      oldPrice: 4300,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "books",
       image: "/uploads/li/l10.webp",
    imageWebp: "/uploads/li/l10-l.webp",
      description: "مكتبة أنيقة بترتيب أرفف غير تقليدي للديكور والكتب.",
      dimensions: "العرض 100 سم × الارتفاع 100 سم × العمق 25 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "بيج", codes: "#e2c8a6" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
  
    /* ============= 10 — komod (كومود) ============= */
    {
      id: 91,
      name: "كومود مودرن NO-K1",
      price: 3350,
      oldPrice: 4100,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko1.webp",
    imageWebp: "/uploads/ko/ko1-l.webp",
      description: "كومود بجوار السرير مع درجين لتخزين الأغراض الشخصية.",
      dimensions: "العرض 50 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "اسود", codes: "#333" },
        { name: "خشبي فاتح", codes: "#d2b48c" }
      ]
    },
    {
      id: 92,
      name: "كومود لغراف الاطفال NO-K2",
      price: 3900,
      oldPrice: 4800,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko2.webp",
    imageWebp: "/uploads/ko/ko2-l.webp",
      description: "كومود بثلاثة أدراج مناسب لغرف الاطفال امكانية توصيل اكباس الكهرباء عبره  .",
      dimensions: "العرض 60 سم × الارتفاع 70 سم × العمق 40 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 93,
      name: "كومود مودرن NO-K3",
      price: 3550,
      oldPrice: 4400,
      hasMeters: false,
      rating: 4.5,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko3.webp",
    imageWebp: "/uploads/ko/ko3-l.webp",
      description: "كومود مودرن يناسب معظم تصاميم غرف النوم متعدد الالوان والاحجام حسب الطلب.",
      dimensions: "العرض 50 سم × الارتفاع 65 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 94,
      name: "كومود مودرن NO-K4",
      price: 3800,
      oldPrice: 4500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko4.webp",
    imageWebp: "/uploads/ko/ko4-l.webp",
      description: "كومود بواجهة مودرن بدون مقابض مع نظام فتح بالضغط.",
      dimensions: "العرض 55 سم × الارتفاع 65 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "أسود", codes: "#222222" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 95,
      name: "كومود مودرن NO-K5",
      price: 3800,
      oldPrice: 4500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko5.webp",
    imageWebp: "/uploads/ko/ko5-l.webp",
      description: "كومود اثنين درج  واسعة لتخزين أكبر قدر من الأغراض مع شكل مودرن وعصري .",
      dimensions: "العرض 60 سم × الارتفاع 70 سم × العمق 40 سم",
      colors: [
        { name: "أبيض ", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي ", codes: "#d5b28a" }
      ]
    },
    {
      id: 96,
      name: "كومود مودرن NO-K6",
      price: 3150,
      category: "komod",
      oldPrice: 3900,
      hasMeters: false,
      rating: 4.5,
      badge: "تخفيضات",
       image: "/uploads/ko/ko6.webp",
    imageWebp: "/uploads/ko/ko6-l.webp",
      description: "كومود بسطح علوي يستخدم لوضع الأباجورات أو الإكسسوارات .",
      dimensions: "العرض 50 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: " اسود", codes: "#333" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" }
      ]
    },
    {
      id: 97,
      name: "كومود مودرن NO-K7",
      price: 3100,
      oldPrice: 3700,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko7.webp",
    imageWebp: "/uploads/ko/ko7-l.webp",
      description: "كومود بتصميم عصري يمكن استخدامه كقطعة ديكور مستقلة.",
      dimensions: "العرض 50 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 98,
      name: "كومود مودرن NO-K8",
      price: 3800,
      oldPrice: 4500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko8.webp",
    imageWebp: "/uploads/ko/ko8-l.webp",
      description: "كومود اثنين درج  واسعة لتخزين أكبر قدر من الأغراض مع شكل مودرن وعصري .",
      dimensions: "العرض 60 سم × الارتفاع 70 سم × العمق 40 سم",
      colors: [
        { name: "أبيض ", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي ", codes: "#d5b28a" }
      ]
    },
    {
      id: 99,
      name: "كومود مودرن NO-K9",
      price: 3150,
      hasMeters: false,
      category: "komod",
      oldPrice: 3900,
      rating: 4.5,
      badge: "تخفيضات",
       image: "/uploads/ko/ko9.webp",
    imageWebp: "/uploads/ko/ko9-l.webp",
      description: "كومود بسطح علوي يستخدم لوضع الأباجورات أو الإكسسوارات .",
      dimensions: "العرض 50 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: " اسود", codes: "#333" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d2b48c" }
      ]
    },
    {
      id: 100,
      name: "كومود مودرن NO-K10",
      price: 3100,
      oldPrice: 3700,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "komod",
       image: "/uploads/ko/ko10.webp",
    imageWebp: "/uploads/ko/ko10-l.webp",
      description: "كومود بتصميم عصري يمكن استخدامه كقطعة ديكور مستقلة.",
      dimensions: "العرض 50 سم × الارتفاع 60 سم × العمق 40 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
  
  
    /* ============= 11 — units_sh (وحدات أحذية) ============= */
    {
      id: 101,
      name: "جزامة مقاس 100×70 NO-SH1",
      price: 5000,
      oldPrice: 5700,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s1.webp",
    imageWebp: "/uploads/sh/s1-l.webp",
      description: "جزامة بدلفة واحدة مع اتنين رف مفتوح تكفي لعدد جيد من الأحذية.",
      dimensions: "العرض 100 سم × الارتفاع 70 سم × العمق 35 سم",
      colors: [
        { name: "اخضر", codes: "#6f8f7d" },
        { name: "اسود", codes: "#333" },
        { name: "ابيض ", codes: "#fafafa" },
        { name: "خشبي فاتح", codes: "#d2b48c" }
      ]
    },
    {
      id: 102,
      name: "جزامة مقاس 100×90 NO-SH2",
      price: 6500,
      oldPrice: 7550,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s2.webp",
    imageWebp: "/uploads/sh/s2-l.webp",
      description: "جزامة بثلاثة أبواب ورفوف  لوضع الاحذيه أو الإكسسوارات.",
      dimensions: "العرض 90 سم × الارتفاع 100 سم × العمق 35 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 103,
      name: "جزامة مقاس 120×90 NO-SH3",
      price: 6600,
      oldPrice: 7550,
      hasMeters: false,
      rating: 4.7,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s3.webp",
    imageWebp: "/uploads/sh/s3-l.webp",
      description: "جزامة بمقعد علوي للجلوس أثناء ارتداء الأحذية.",
      dimensions: "العرض 90 سم × الارتفاع 120 سم × العمق 35 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " اسود", codes: "#333" },
        { name: "خشبي متوسط", codes: "#b07a4a" }
      ]
    },
    {
      id: 104,
      name: "جزامة مقاس 110×90  NO-SH4",
      price: 5250,
      oldPrice: 6500,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s4.webp",
    imageWebp: "/uploads/sh/s4-l.webp",
      description: "جزامة بدرج تخزين علوي  و اتنين دلفة مع مساحه تخزين عدد كبير من الاحذية.",
      dimensions: "العرض 90 سم × الارتفاع 110 سم × العمق 35 سم",
      colors: [
        { name: "اسود", codes: "#333" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id:105,
      name: "جزامة مقاس 120×90 NO-SH5 ",
      price: 6200,
      oldPrice: 7400,
      hasMeters: false,
      rating: 4.5,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s5.webp",
    imageWebp: "/uploads/sh/s5-l.webp",
      description: "جزامة ذات تصميم مودرن بدلفتين  تمنح مظهراً مرتباً.",
      dimensions: "العرض 90 سم × الارتفاع 120 سم × العمق 35 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "أسود", codes: "#222222" },
        { name: "خشبي داكن", codes: "#6b4226" }
      ]
    },
    {
      id: 106,
      name: "جزامة مقاس 110×85 NO-SH6",
      price: 5900,
      oldPrice: 7100,
      hasMeters: false,
      rating: 4,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s6.webp",
    imageWebp: "/uploads/sh/s6-l.webp",
      description: "جزامة متوسطه الطول اتنين دلفة و بأرفف كثيرة مناسبة للعائلات الكبيرة.",
      dimensions: "العرض 85 سم × الارتفاع 110 سم × العمق 35 سم",
      colors: [
        { name: "أبيض مطفي", codes: "#f4f4f4" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 107,
      name: "جزامة مقاس 120×90 NO-SH7 ",
      price: 7000,
      oldPrice: 8500,
      hasMeters: false,
      rating: 4.5,
      badge: "تخفيضات",
      category: "units_sh",
        image: "/uploads/sh/s7.webp",
    imageWebp: "/uploads/sh/s7-l.webp",
      description: "جزامة بباب مائل لسهولة الوصول للأحذية اليومية.",
      dimensions: "العرض 80 سم × الارتفاع 120 سم × العمق 30 سم",
      colors: [
        { name: "بيج", codes: "#e2c8a6" },
        { name: "أبيض", codes: "#ffffff" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
  
  {
    id: 108,
    name: "جزامة مقاس 110×85 NO-SH8",
    price: 5900,
    oldPrice: 7100,
    hasMeters: false,
    rating: 4,
    badge: "تخفيضات",
    category: "units_sh",
      image: "/uploads/sh/s8.webp",
    imageWebp: "/uploads/sh/s8-l.webp",
    description: "جزامة متوسطه الطول اتنين دلفة و بأرفف كثيرة مناسبة للعائلات الكبيرة.",
    dimensions: "العرض 85 سم × الارتفاع 110 سم × العمق 35 سم",
    colors: [
      { name: "أبيض مطفي", codes: "#f4f4f4" },
      { name: "رمادي أُنثراسايت", codes: "#333333" },
      { name: "خشبي متوسط", codes: "#b37b4b" }
    ]
  },
  {
    id: 109,
    name: "جزامة مقاس 120×90 NO-SH9 ",
    price: 7000,
    oldPrice: 8500,
    hasMeters: false,
    rating: 4.5,
    badge: "تخفيضات",
    category: "units_sh",
      image: "/uploads/sh/s9.webp",
    imageWebp: "/uploads/sh/s9-l.webp",
    description: "جزامة بباب مائل لسهولة الوصول للأحذية اليومية.",
    dimensions: "العرض 80 سم × الارتفاع 120 سم × العمق 30 سم",
    colors: [
      { name: "بيج", codes: "#e2c8a6" },
      { name: "أبيض", codes: "#ffffff" },
      { name: "خشبي طبيعي", codes: "#c89b68" }
    ]
  },
  {
    id: 110,
    name: "مكتبة NO-SH10",
    price: 7500,
    oldPrice: 9000,
    hasMeters: false,
    rating: 5,
    badge: "تخفيضات",
    category: "units_sh",
      image: "/uploads/sh/s10.webp",
    imageWebp: "/uploads/sh/s10-l.webp",
    description: "جزامه بثلاث ادراج معي مساحه تحزين كبيرة للاحذية  مع وجود ارفف.",
    dimensions: "العرض 100 سم × الارتفاع 120 سم × العمق 35 سم",
    colors: [
      { name: "ابيض × خشبي", codes: ["#c7b092", "#ffffff"]},
      { name: "أبيض", codes: "#ffffff" },
      { name: "خشبي فاتح", codes: "#d5b28a" }
    ]
  },

    /* ============= 12 — office (مكتب) ============= */
    {
      id: 111,
      name: "مكتب + مكتبة NO-O1",
      price: 8500,
      oldPrice: 10500,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "office",
      image: "/uploads/of/o1.webp",
    imageWebp: "/uploads/of/o1-l.webp",
      description: "مكتب مودرن مع مكتبة مناسب جدا مع الكثير من الارفف لشكل افضل ومساحه تخزين اكبر للكتب.",
      dimensions: "العرض 120 سم × الارتفاع 75 سم × العمق 45 سم ارتفاع المكتبة 120 سم × عرض 30 سم",
      colors: [
        { name: "رمادي × خشبي", codes: ["#bb9460", "#8b8484"]},
        { name: "خشبي ", codes: "#bb9460" },
        { name: " بني × ابيض", codes: ["#8b5911", "#fafafa"]},
      ]
    },
    {
      id: 112,
      name: "مكتب  NO-O2",
      price: 7000,
      oldPrice: 9000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "office",
     image: "/uploads/of/o2.webp",
    imageWebp: "/uploads/of/o2-l.webp",
      description: "مكتب معدني مطلي بطلاءالكتروستاتيك شكل رائع وجودة عالية",
      dimensions: "العرض 120 سم × الارتفاع 75 سم × العمق 45 سم",
      colors: [
        { name: "خشبي", codes: "#e2c8a6" },
        { name: "أبيض مطفي", codes: "#f5f5f5" },
        { name: "رمادي متوسط", codes: "#9e9e9e" }
      ]
    },
    {
      id: 113,
      name: "مكتب NO-O3 ",
      price: 6400,
      oldPrice: 9950,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "office",
     image: "/uploads/of/o3.webp",
    imageWebp: "/uploads/of/o3-l.webp",
      description: "مكتب + مكتبة مع شكل مودرن مناسب للطلاب واصحاب الاعمال المكتبية.",
      dimensions: " العرض 85سم × الارتفاع 75سم × العمق 45سم × ارتفاع المكتبة 120سم × عرض 35سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي أُنثراسايت", codes: "#333333" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 114,
      name: "مكتب NO-O4",
      price: 6200,
      oldPrice: 8700,
      hasMeters: false,
      rating: 4.5,
      badge: "تخفيضات",
      category: "office",
     image: "/uploads/of/o4.webp",
    imageWebp: "/uploads/of/o4-l.webp",
      description: "مكتب بتصميم رائع مخصص لغرف الاطفال ",
      dimensions: "العرض 100 سم × الارتفاع 170 سم × العمق 60 سم",
      colors: [
        { name: "أبيض ", codes: "#ffffff" },
        { name: "خشبي ", codes: "#c89b68" },
        { name: "رمادي ", codes: "#8b8484" }
      ]
    },
    {
      id: 115,
      name: "مكتب NO-O5",
      price: 7500,
      oldPrice: 10000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "office",
     image: "/uploads/of/o5.webp",
    imageWebp: "/uploads/of/o5-l.webp",
      description: "مكتب عملي بحجم متوسط مناسب لغرف الأطفال أو المذاكرة.",
      dimensions: "العرض 120 سم × الارتفاع 75 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " بني", codes: "#5f3805" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
    {
      id: 116,
      name: "مكتب NO-O6",
      price: 4200,
      hasMeters: false,
      category: "office",
     image: "/uploads/of/o6.webp",
    imageWebp: "/uploads/of/o6-l.webp",
      description: "مكتب مع رفوف علوية لترتيب الكتب والملفات فوق سطح المكتب.",
      dimensions: "العرض 140 سم × الارتفاع 160 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 117,
      name: "مكتب NO-O7",
      price: 3800,
      hasMeters: false,
      category: "office",
     image: "/uploads/of/o7.webp",
    imageWebp: "/uploads/of/o7-l.webp",
      description: "مكتب بواجهة بسيطة مع وحدة جانبية مغلقة للحفاظ على ترتيب المكان.",
      dimensions: "العرض 150 سم × الارتفاع 75 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي فاتح", codes: "#d7d7d7" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 118,
      name: "مكتب NO-O8",
      price: 4200,
      hasMeters: false,
      category: "office",
      image: "/uploads/of/o8.webp",
    imageWebp: "/uploads/of/o8-l.webp",
      description: "مكتب مع رفوف علوية لترتيب الكتب والملفات فوق سطح المكتب.",
      dimensions: "العرض 140 سم × الارتفاع 160 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي متوسط", codes: "#9e9e9e" },
        { name: "خشبي متوسط", codes: "#b37b4b" }
      ]
    },
    {
      id: 119,
      name: "مكتب NO-O9",
      price: 3800,
      hasMeters: false,
      category: "office",
      image: "/uploads/of/o9.webp",
    imageWebp: "/uploads/of/o9-l.webp",
      description: "مكتب بواجهة بسيطة مع وحدة جانبية مغلقة للحفاظ على ترتيب المكان.",
      dimensions: "العرض 150 سم × الارتفاع 75 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: "رمادي فاتح", codes: "#d7d7d7" },
        { name: "خشبي طبيعي", codes: "#c89b68" }
      ]
    },
    {
      id: 120,
      name: "مكتب NO-O10",
      price: 7500,
      oldPrice: 10000,
      hasMeters: false,
      rating: 5,
      badge: "تخفيضات",
      category: "office",
      image: "/uploads/of/o10.webp",
    imageWebp: "/uploads/of/o10-l.webp",
      description: "مكتب عملي بحجم متوسط مناسب لغرف الأطفال أو المذاكرة.",
      dimensions: "العرض 120 سم × الارتفاع 75 سم × العمق 60 سم",
      colors: [
        { name: "أبيض", codes: "#ffffff" },
        { name: " بني", codes: "#5f3805" },
        { name: "خشبي فاتح", codes: "#d5b28a" }
      ]
    },
  ];
  module.exports = PRODUCTS;
  