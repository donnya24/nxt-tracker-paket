// data/couriers.ts

// Data utama semua kurir. Ganti logoUrl di sini saja!
const COURIER_DATA = [
  {
    value: "jne",
    label: "JNE",
    color: "bg-red-500",
    logoUrl:
      "https://tse1.mm.bing.net/th/id/OIP.hPk3MZXjam_Q5TlNN1abagAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    value: "tiki",
    label: "TIKI",
    color: "bg-green-500",
    logoUrl:
      "https://www.julo.co.id/sites/default/files/2024-10/franchise%20TIKI.webp",
  },
  {
    value: "pos",
    label: "POS",
    color: "bg-blue-500",
    logoUrl:
      "https://everpro.id/wp-content/uploads/2025/06/PT.-Pos-Indonesia-Persero.webp",
  },
  {
    value: "jnt",
    label: "J&T",
    color: "bg-purple-500",
    logoUrl:
      "https://www.julo.co.id/sites/default/files/2024-10/J%26T%20EXPRESS%20LOGO.webp",
  },
  {
    value: "sicepat",
    label: "SiCepat",
    color: "bg-orange-500",
    logoUrl:
      "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/mtolncn9plutnkrwtvqy?ik-sanitizeSvg=true",
  },
  {
    value: "anteraja",
    label: "AnterAja",
    color: "bg-yellow-500",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Eh_d1S7_YSvkaokLwMlBmmfvdBD9gtj_9A&s",
  },
  {
    value: "wahana",
    label: "Wahana",
    color: "bg-amber-500",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBYrMRkhp840Zd_41a3x7kgU7L7IdZyTjoDA&s",
  },
  {
    value: "ninja",
    label: "Ninja",
    color: "bg-pink-500",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/C510BAQFDDdyVizNg9w/company-logo_200_200/company-logo_200_200/0/1630570995980/ninjaxpress_logo?e=2147483647&v=beta&t=hpFLnhmggK5ZcR4Mck5L5i2-Z9cm_EsbHX8zUdFQ-ZE",
  },
  {
    value: "lion",
    label: "Lion",
    color: "bg-gray-700",
    logoUrl:
      "https://kuliahdimana.id/public/loker/cd64e9e83eca50dcdf190f9e0c23fb25.jpg",
  },
  {
    value: "SPX",
    label: "SPX",
    color: "bg-orange-600",
    logoUrl:
      "https://madingloker.com/wp-content/uploads/2024/06/SPX-Express.jpg",
  },
  {
    value: "lazada",
    label: "Lazada Express",
    color: "bg-blue-800",
    logoUrl: "https://cekresi.com/images/cek-resi-lex.jpg",
  },
  {
    value: "jntcargo",
    label: "J&T Cargo",
    color: "bg-purple-700",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNzcSTLbuSD_R9sAWXUfVuqxTHW0dIVWDrg&s",
  },
  {
    value: "indah",
    label: "Indah Cargo",
    color: "bg-green-700",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpCmYXsiDwm_rFVI33Svut7Trun4c4U2dTg&s",
  },
  {
    value: "dakota",
    label: "Dakota Cargo",
    color: "bg-gray-800",
    logoUrl: "https://www.dakotacargo.co.id/images/pic01.webp",
  },
  {
    value: "rex",
    label: "REX",
    color: "bg-gray-500",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2LLKZVWSRjntQab_KFtCc_EQUastNy8kBg&s",
  },
  {
    value: "ide",
    label: "ID Express",
    color: "bg-teal-500",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Logo-idexpress.jpg",
  },
  {
    value: "jet",
    label: "JET",
    color: "bg-purple-600",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pER4w_Xcsh4wsMheFVu_wRAVo87WpZ1G7A&s",
  },
  {
    value: "pcp",
    label: "PCP",
    color: "bg-blue-600",
    logoUrl: "https://pcpexpress.com/images/2021/myPCP.png",
  },
  {
    value: "sap",
    label: "SAP",
    color: "bg-green-600",
    logoUrl: "https://www.sapx.id/assets/img/logo/sapx-logo-og-image.png",
  },
  {
    value: "rpx",
    label: "RPX",
    color: "bg-red-600",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hV6oN4cBoIQSXOPmarX4Xcfj1n3uHTHeQQ&s",
  },
  {
    value: "first",
    label: "First Logistic",
    color: "bg-blue-900",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/D4E0BAQGZX6uT0rfq7A/company-logo_200_200/company-logo_200_200/0/1688482404105?e=2147483647&v=beta&t=43JpiRmDVqOIrFnShGy6ofktw-vCdFX56WJktK-9wTw",
  },
  {
    value: "kgx",
    label: "KGXpress",
    color: "bg-cyan-500",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/C560BAQHO5hB77T9eag/company-logo_200_200/company-logo_200_200/0/1630666447462/kgxpresslogistics_logo?e=2147483647&v=beta&t=bMJ0Y2jPELydz_-CVqbOQKQjz3n_k9rc4WfZZHh4CyA",
  },
  {
    value: "jxe",
    label: "JX Express",
    color: "bg-blue-700",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRao7LnW78FaYhWbbpsE4L1wm33RzuAsW5P0Q&s",
  },
];

// Data yang dikelompokkan berdasarkan kategori untuk dropdown
export const COURIER_CATEGORIES = [
  {
    name: "Express",
    icon: "🚚",
    couriers: COURIER_DATA.filter((c) =>
      [
        "jne",
        "tiki",
        "pos",
        "jnt",
        "sicepat",
        "anteraja",
        "wahana",
        "ninja",
        "lion",
      ].includes(c.value),
    ),
  },
  {
    name: "E-commerce",
    icon: "🛒",
    couriers: COURIER_DATA.filter((c) =>
      ["SPX", "lazada"].includes(c.value),
    ),
  },
  {
    name: "Cargo",
    icon: "📦",
    couriers: COURIER_DATA.filter((c) =>
      ["jntcargo", "indah", "dakota"].includes(c.value),
    ),
  },
  {
    name: "Lainnya",
    icon: "📋",
    couriers: COURIER_DATA.filter((c) =>
      [
        "rex",
        "ide",
        "spx",
        "jet",
        "pcp",
        "sap",
        "rpx",
        "first",
        "kgx",
        "jxe",
      ].includes(c.value),
    ),
  },
];

// Data datar (tanpa kategori) untuk komponen lain
export const ALL_COURIERS = COURIER_DATA;
