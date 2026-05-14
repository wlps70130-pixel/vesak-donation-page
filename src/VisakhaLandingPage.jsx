import {
  AppWindow,
  BookOpen,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock3,
  Flower2,
  Heart,
  Home,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  QrCode,
  RadioTower,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Bell,
  CalendarCheck,
  Copy,
  HandHeart,
  Megaphone,
  UserRound,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1SUxJaPWNNUWT2H1l0jgulf9ITJWhfOl97lvfKjttoAQ/export?format=csv&gid=1389131251";

const DEFAULTS = {
  eyebrow: "ขอเชิญร่วม",
  siteTitle: "วันวิสาขบูชา",
  siteSubtitle: "VISAKHA DHAMMAKAYARAM",
  heroTitle: "ปฏิบัติธรรม วันวิสาขบูชา",
  heroDate: "ขึ้น 15 ค่ำ เดือน 7 ปี 2569",
  heroText:
    "น้อมรำลึกถึงพระสัมมาสัมพุทธเจ้า ร่วมทำบุญ บำรุงพระพุทธศาสนา และสืบสานประเพณีอันดีงามด้วยจิตศรัทธา",
  eventDate: "วันอาทิตย์ที่ 31 พฤษภาคม 2569",
  eventPlace: "ณ พระมหาเจดีย์มหารัชมงคล วัดหลวงพ่อสดฯ",
  eventTime: "09.00 น. เป็นต้นไป",
  objectiveTitle: "วัตถุประสงค์การทอดผ้าป่าสามัคคี",
  objectiveSubtitle:
    "เพื่อสมทบทุนติดตั้งระบบโครงข่ายสัญญาณและระบบความปลอดภัยภายในวัด",
  objectiveIntro:
    "การทอดผ้าป่าสามัคคีในวันวิสาขบูชาครั้งนี้ จัดขึ้นเพื่อสมทบทุนในการพัฒนาระบบเทคโนโลยีสารสนเทศ ระบบสื่อสาร และระบบความปลอดภัยภายในวัด ให้สามารถรองรับการบริหารกิจการคณะสงฆ์ การเผยแผ่ธรรมะ และการดูแลพื้นที่วัดได้อย่างมีประสิทธิภาพมากยิ่งขึ้น",
  donationHeading: "ร่วมบุญออนไลน์",
  donationSubtitle: "สะดวก รวดเร็ว ได้บุญ",
  bankName: "ธนาคารกรุงเทพ",
  bankAccount: "422-0-31266-6",
  bankAccountName: "วัดหลวงพ่อสดฯ",
  slipNote: "หลังโอนเงินแล้ว โปรดส่งสลิปเพื่อออกใบอนุโมทนาบัตร",
  lineId: "@info.wat06",
  donorHeading: "ร่วมเป็นเจ้าภาพผ้าป่าสามัคคี",
  contactPhone: "090-595-5162",
  facebook: "วัดหลวงพ่อสดฯ",
  tiktok: "วัดหลวงพ่อสดฯ",
  location:
    "ณ พระมหาเจดีย์มหารัชมงคล วัดหลวงพ่อสดฯ อ.ดำเนินสะดวก จ.ราชบุรี",
  mapLabel: "แผนที่",
  quote: "การให้ธรรมะ ชนะการให้ทั้งปวง",
  quoteBy: "— พุทธพจน์ —",
};

const DEFAULT_OBJECTIVES = [
  {
    title: "แอปพลิเคชันบริหารกิจการคณะสงฆ์",
    detail:
      "จัดทำระบบแอปพลิเคชันเพื่อสนับสนุนงานบริหารจัดการภายในวัด งานข้อมูลกิจกรรม งานสื่อสาร และงานประสานงานของคณะสงฆ์ให้เป็นระบบมากขึ้น",
    icon: "app",
  },
  {
    title: "ระบบเผยแผ่ธรรมะออนไลน์",
    detail:
      "พัฒนาช่องทางดิจิทัลสำหรับเผยแผ่ธรรมะ ข่าวสาร กิจกรรมบุญ ตารางปฏิบัติธรรม และสื่อธรรมะ ให้ญาติโยมเข้าถึงได้ง่ายและต่อเนื่อง",
    icon: "broadcast",
  },
  {
    title: "ระบบโครงข่ายสัญญาณภายในวัด",
    detail:
      "วางระบบ Network และ Internet ภายในพื้นที่วัด เพื่อรองรับระบบถ่ายทอดสด ระบบสำนักงาน ระบบกล้องวงจรปิด และการเชื่อมต่ออุปกรณ์ต่าง ๆ",
    icon: "network",
  },
  {
    title: "กล้องวงจรปิดและระบบความปลอดภัย",
    detail:
      "ติดตั้งกล้องวงจรปิดรอบพื้นที่วัด เพื่อดูแลศาสนสถาน ทรัพย์สินของวัด พระภิกษุสามเณร เจ้าหน้าที่ และญาติโยมที่มาร่วมกิจกรรม",
    icon: "shield",
  },
];

const DEFAULT_ACTIVITIES = [
  {
    title: "ปฏิบัติธรรม",
    detail: "ฟังธรรม เจริญสติ และน้อมใจให้สงบผ่องใส",
  },
  {
    title: "ทอดผ้าป่า",
    detail: "ร่วมทำบุญสมทบทุนพัฒนาระบบภายในวัด",
  },
  {
    title: "เวียนเทียน",
    detail: "เวียนเทียนรอบองค์พระเจดีย์ด้วยจิตศรัทธา",
  },
];

const DEFAULT_SCHEDULE = [
  ["09.00 น.", "ลงทะเบียน / ตักบาตร / สวดมนต์"],
  ["09.30 น.", "พระธรรมเทศนา 1"],
  ["10.30 น.", "พิธีทอดผ้าป่าสามัคคี"],
  ["11.00 น.", "เจริญภาวนา"],
  ["12.30 น.", "รับประทานอาหาร / พักผ่อน"],
  ["13.09 น.", "เวียนเทียนรอบพระเจดีย์"],
];

const DEFAULT_BENEFITS = [
  ["ทำจิตใจให้ผ่องใส", "sparkles"],
  ["เสริมบุญ เสริมบารมี", "flower"],
  ["สืบสานพระพุทธศาสนา", "book"],
  ["ร่วมสร้างสังคมแห่งความดีงาม", "heart"],
];

const ICONS = {
  app: AppWindow,
  smartphone: Smartphone,
  broadcast: RadioTower,
  book: BookOpen,
  network: Network,
  wifi: Wifi,
  shield: ShieldCheck,
  camera: Camera,
  flower: Flower2,
  heart: Heart,
  sparkles: Sparkles,
  home: Home,
};

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows.filter((items) => items.some(Boolean));
}

function looksLikeImage(value) {
  return /^https?:\/\/.+\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value || "");
}

function settingsFromRows(rows) {
  const settings = {};
  rows.forEach((row) => {
    const key = row[5]?.trim();
    const value = row[6]?.trim();
    if (key && value) settings[key] = value;
  });
  return settings;
}

function findSetting(settings, keys, fallback = "") {
  for (const key of keys) {
    const exact = settings[key];
    if (exact) return exact;
    const foundKey = Object.keys(settings).find((item) => item.includes(key));
    if (foundKey) return settings[foundKey];
  }
  return fallback;
}

function buildData(rows) {
  const settings = settingsFromRows(rows);
  const donors = rows
    .slice(1)
    .map((row) => ({
      order: row[0],
      type: row[1],
      name: row[2],
      amount: row[3],
    }))
    .filter((item) => item.order || item.type || item.name || item.amount);

  const schedule = rows
    .slice(1)
    .map((row) => [row[8], row[9]])
    .filter(([time, detail]) => time || detail);

  const activities = rows
    .slice(1)
    .map((row) => ({ title: row[11], detail: row[12], image: row[13] }))
    .filter((item) => item.title || item.detail || item.image);

  const objectives = rows
    .slice(1)
    .map((row) => ({ title: row[15], detail: row[16], icon: row[17] }))
    .filter((item) => item.title || item.detail);

  const benefits = rows
    .slice(1)
    .map((row) => [row[19], row[20]])
    .filter(([title]) => title);

  const coverImage = findSetting(
    settings,
    ["ลิงก์รูปหน้าปก", "รูปหน้าปก", "ข้อความรูปปก"],
    "",
  );

  return {
    ...DEFAULTS,
    siteTitle: findSetting(settings, ["ชื่อเว็บ", "ชื่อป้ายหลัก"], DEFAULTS.siteTitle),
    siteSubtitle: findSetting(settings, ["subtitle", "ชื่อกิจกรรมรอง"], DEFAULTS.siteSubtitle),
    eyebrow: findSetting(settings, ["งานบุญประจำปี", "ข้อความนำ"], DEFAULTS.eyebrow),
    heroTitle: findSetting(settings, ["ชื่อกิจกรรมหลัก", "ชื่อป้ายหลัก"], DEFAULTS.heroTitle),
    heroDate: findSetting(settings, ["วันพระ", "ขึ้น 15"], DEFAULTS.heroDate),
    heroText: findSetting(settings, ["คำอธิบายป้ายหลัก", "แนวคิดของงาน"], DEFAULTS.heroText),
    eventDate: findSetting(settings, ["วันที่จัดงาน"], DEFAULTS.eventDate),
    eventPlace: findSetting(settings, ["สถานที่", "สถานที่จัดงาน"], DEFAULTS.eventPlace),
    eventTime: findSetting(settings, ["เวลาเริ่มงาน"], DEFAULTS.eventTime),
    objectiveTitle: findSetting(settings, ["หัวข้อวัตถุประสงค์"], DEFAULTS.objectiveTitle),
    objectiveSubtitle: findSetting(settings, ["คำอธิบายวัตถุประสงค์"], DEFAULTS.objectiveSubtitle),
    objectiveIntro: findSetting(settings, ["เนื้อหาวัตถุประสงค์", "รายละเอียดวัตถุประสงค์"], DEFAULTS.objectiveIntro),
    donationHeading: findSetting(settings, ["หัวข้อร่วมทำบุญ"], DEFAULTS.donationHeading),
    bankName: findSetting(settings, ["ธนาคาร"], DEFAULTS.bankName),
    bankAccount: findSetting(settings, ["เลขที่บัญชี", "เลขบัญชี"], DEFAULTS.bankAccount),
    bankAccountName: findSetting(settings, ["ชื่อบัญชี"], DEFAULTS.bankAccountName),
    qrImage: findSetting(settings, ["ลิงก์ QR ทำบุญ", "QR"], ""),
    logoImage: findSetting(settings, ["ลิงก์โลโก้วัด", "โลโก้วัด"], ""),
    coverImage: looksLikeImage(coverImage) ? coverImage : "",
    lineId: findSetting(settings, ["Line ID", "ติดต่อสอบถาม"], DEFAULTS.lineId).replace("Line ID:", "").trim(),
    contactPhone: findSetting(settings, ["โทร", "เบอร์โทร"], DEFAULTS.contactPhone),
    facebook: findSetting(settings, ["Facebook"], DEFAULTS.facebook),
    tiktok: findSetting(settings, ["TikTok"], DEFAULTS.tiktok),
    mapLabel: findSetting(settings, ["แผนที่"], DEFAULTS.mapLabel),
    location: findSetting(settings, ["สถานที่ด้านล่าง", "สถานที่"], DEFAULTS.location),
    donorHeading: findSetting(settings, ["หัวข้อก่อนตาราง", "ร่วมเป็นเจ้าภาพ"], DEFAULTS.donorHeading),
    quote: findSetting(settings, ["พุทธพจน์", "quote"], DEFAULTS.quote),
    donors,
    schedule: schedule.length ? schedule : DEFAULT_SCHEDULE,
    activities: activities.length ? activities : DEFAULT_ACTIVITIES,
    objectives: objectives.length ? objectives : DEFAULT_OBJECTIVES,
    benefits: benefits.length ? benefits : DEFAULT_BENEFITS,
  };
}

function IconBadge({ icon = "flower", className = "" }) {
  const Icon = ICONS[icon?.toLowerCase?.()] || Flower2;
  return (
    <span className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-softblue text-navy ring-1 ring-gold/25 ${className}`}>
      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function Header({ data, currentView, onNavigate }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["หน้าหลัก", "home"],
    ["วัตถุประสงค์", "objectives"],
    ["กำหนดการ", "schedule"],
    ["ร่วมทำบุญ", "donate"],
    ["ติดต่อเรา", "contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold/10 bg-white/72 shadow-[0_12px_35px_rgba(11,42,74,0.05)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="เมนูหลัก">
        <button type="button" onClick={() => onNavigate("home")} className="flex min-w-0 items-center gap-3 text-left" aria-label="กลับไปหน้าหลัก">
          <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-gold/50 bg-white shadow-soft">
            {looksLikeImage(data.logoImage) ? (
              <img src={data.logoImage} alt="โลโก้วัด" className="h-full w-full object-contain p-1.5" loading="eager" />
            ) : (
              <Landmark className="text-gold" size={24} aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-tight text-ink">{data.siteTitle}</p>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-muted">{data.siteSubtitle}</p>
          </div>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, view]) => (
            <button
              key={view}
              type="button"
              onClick={() => onNavigate(view)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-navy ${currentView === view ? "bg-white text-gold shadow-sm" : "text-ink"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => onNavigate("donate")} className="hidden min-h-11 items-center rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#b78324] lg:inline-flex">
          ร่วมทำบุญ
        </button>
        <button
          type="button"
          className="hidden min-h-11 min-w-11 place-items-center rounded-full bg-white text-navy shadow-soft"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-gold/15 bg-ivory px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([label, view]) => (
              <button
                key={view}
                type="button"
                onClick={() => {
                  onNavigate(view);
                  setOpen(false);
                }}
                className="rounded-2xl bg-white px-4 py-3 text-left text-sm font-bold text-ink shadow-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection({ data, onNavigate }) {
  const quickActions = [
    [Heart, "ร่วมทำบุญ", "donate"],
    [CalendarDays, "กำหนดการ", "schedule"],
    [Sparkles, "วัตถุประสงค์", "objectives"],
    [Phone, "ติดต่อวัด", "contact"],
  ];

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-14 lg:pt-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(201,150,45,0.16),transparent_36rem)]" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="text-center lg:text-left">
          <p className="mx-auto inline-flex rounded-full border border-gold/20 bg-white/76 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-gold shadow-sm lg:mx-0">
            Visakha 2569
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-5xl font-black leading-tight text-navy sm:text-6xl lg:mx-0 lg:text-7xl">
            {data.siteTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base font-semibold leading-8 text-muted lg:mx-0">
            {data.heroText}
          </p>
        </div>

        <div className="app-panel overflow-hidden rounded-[2rem] p-4 sm:p-5">
          <div className="grid gap-4">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cream via-white to-softblue">
              {data.coverImage ? (
                <img src={data.coverImage} alt="ภาพปกงานวันวิสาขบูชา" className="absolute inset-0 h-full w-full object-contain" loading="eager" />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-white/70 text-gold shadow-glow">
                    <Landmark size={58} strokeWidth={1.35} aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function MiniSchedulePhone({ data }) {
  return (
    <aside className="mx-auto w-full max-w-[320px] rounded-[2.2rem] border-[7px] border-[#101318] bg-ivory p-4 shadow-soft">
      <div className="phone-status">
        <span>9:41</span>
        <span>●● ▰</span>
      </div>
      <h3 className="mt-3 text-center text-xl font-black text-navy">กำหนดการ</h3>
      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gold/20">
        {data.schedule.slice(0, 6).map(([time, detail]) => (
          <div key={`${time}-${detail}`} className="grid grid-cols-[36px_1fr] gap-3 border-b border-gold/15 py-3 last:border-b-0">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-white">
              <Clock3 size={16} aria-hidden="true" />
            </span>
            <p className="text-sm leading-6 text-muted">
              <strong className="block text-navy">{time}</strong>
              {detail}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function MiniDonationPhone({ data, onNavigate }) {
  return (
    <aside className="mx-auto w-full max-w-[320px] rounded-[2.2rem] border-[7px] border-[#101318] bg-navy p-4 text-white shadow-soft">
      <div className="phone-status text-white">
        <span>9:41</span>
        <span>●● ▰</span>
      </div>
      <h3 className="mt-3 text-center text-2xl font-black text-gold">ร่วมทำบุญ</h3>
      <p className="text-center text-sm font-semibold text-cream">สะดวก รวดเร็ว ได้บุญ</p>
      <div className="mt-5 rounded-[1.6rem] border border-gold p-4">
        <div className="mx-auto aspect-square w-44 overflow-hidden rounded-2xl bg-white p-2">
          {looksLikeImage(data.qrImage) ? (
            <img src={data.qrImage} alt="QR Code สำหรับร่วมทำบุญ" className="h-full w-full object-contain" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center text-navy">
              <QrCode size={84} className="text-gold" aria-hidden="true" />
            </div>
          )}
        </div>
        <dl className="mt-4 space-y-1 text-sm font-semibold text-cream">
          <div>ธนาคาร {data.bankName}</div>
          <div>เลขบัญชี {data.bankAccount}</div>
          <div>ชื่อบัญชี {data.bankAccountName}</div>
        </dl>
        <button type="button" onClick={() => onNavigate("donate")} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold font-black text-white">
          ส่งสลิปทาง Line OA
        </button>
        <p className="mt-3 text-center text-sm font-bold text-cream">Line OA : {data.lineId}</p>
      </div>
    </aside>
  );
}

function InfoBar({ data }) {
  const items = [
    [CalendarDays, data.eventDate],
    [MapPin, data.eventPlace],
    [Clock3, data.eventTime],
  ];
  return (
    <section className="px-4 sm:px-6 lg:px-8" aria-label="ข้อมูลสำคัญของงาน">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[1.75rem] border border-gold/20 bg-white/82 p-3 shadow-soft backdrop-blur md:grid-cols-3">
        {items.map(([Icon, text], index) => (
          <div key={text} className="flex min-h-[88px] items-center gap-4 rounded-2xl bg-ivory/70 px-4 py-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-gold">
              <Icon size={23} aria-hidden="true" />
            </span>
            <p className="text-base font-bold leading-7 text-ink">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ObjectiveSection({ data }) {
  return (
    <section id="objectives" className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-ivory circuit-pattern opacity-70" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Merit Technology</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-4xl">{data.objectiveTitle}</h2>
          <p className="mt-4 text-lg font-bold text-ink">{data.objectiveSubtitle}</p>
          <p className="mt-4 text-base leading-8 text-muted">{data.objectiveIntro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {data.objectives.map((item) => (
            <article key={item.title} className="glass-card rounded-2xl border border-gold/20 p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold/40">
              <IconBadge icon={item.icon} />
              <h3 className="mt-5 text-xl font-black text-navy">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitySection({ data }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="activity-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Activities</p>
            <h2 id="activity-title" className="mt-2 text-2xl font-black text-navy sm:text-3xl">กิจกรรมภายในงาน</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">ร่วมปฏิบัติบูชา ทำบุญ และสืบสานประเพณีวันสำคัญทางพระพุทธศาสนาอย่างสงบงาม</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {data.activities.map((item, index) => (
            <article key={`${item.title}-${index}`} className="group overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-sm transition hover:-translate-y-1">
              <div className="h-36 bg-ivory sm:h-40">
                {looksLikeImage(item.image) ? (
                  <img src={item.image} alt={`รูปกิจกรรม${item.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="grid h-full place-items-center bg-gradient-to-br from-softblue via-white to-cream">
                    <IconBadge icon={index === 0 ? "flower" : index === 1 ? "heart" : "sparkles"} className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-black text-navy">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleTimeline({ data }) {
  return (
    <section id="schedule" className="px-4 py-6 sm:px-6 lg:px-8" aria-labelledby="schedule-title">
      <div className="app-panel mx-auto max-w-3xl rounded-[1.6rem] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <IconBadge icon="book" className="h-10 w-10 rounded-xl" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Timeline</p>
            <h2 id="schedule-title" className="text-2xl font-black text-navy">กำหนดการ</h2>
          </div>
        </div>
        <div className="space-y-2">
          {data.schedule.map(([time, detail], index) => (
            <div key={`${time}-${index}`} className="grid gap-2 rounded-2xl border border-gold/10 bg-white/76 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/30 sm:grid-cols-[112px_1fr] sm:items-center">
              <time className="inline-flex min-h-9 items-center gap-2 rounded-full bg-cream/70 px-3 text-sm font-black text-gold">
                <Clock3 size={15} aria-hidden="true" />
                {time}
              </time>
              <p className="text-sm font-semibold leading-6 text-ink sm:text-base">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">กำหนดการอาจเปลี่ยนแปลงได้ตามความเหมาะสม</p>
      </div>
    </section>
  );
}

function DonationSection({ data }) {
  const [copied, setCopied] = useState(false);
  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(data.bankAccount);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="donate" className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="donate-title">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-gold/35 bg-navy p-5 text-white shadow-soft sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
        <div>
          <p className="inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-white">ร่วมทำบุญ</p>
          <h2 id="donate-title" className="mt-5 text-3xl font-black sm:text-4xl">{data.donationHeading}</h2>
          <p className="mt-3 text-lg font-semibold text-cream">{data.donationSubtitle}</p>
          <ol className="mt-6 grid gap-3 text-sm font-semibold text-white/78">
            <li className="flex gap-3"><span className="font-black text-gold">1</span><span>สแกน QR Code หรือโอนเข้าบัญชีวัด</span></li>
            <li className="flex gap-3"><span className="font-black text-gold">2</span><span>กดคัดลอกเลขบัญชีได้ทันที</span></li>
            <li className="flex gap-3"><span className="font-black text-gold">3</span><span>ส่งสลิปทาง Line OA เพื่อออกใบอนุโมทนาบัตร</span></li>
          </ol>
          <a href={`https://line.me/R/ti/p/${encodeURIComponent(data.lineId)}`} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#b78324]">
            <MessageCircle size={20} aria-hidden="true" />
            ส่งสลิปทาง Line OA
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-[minmax(210px,280px)_1fr] md:items-center">
          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.6rem] border border-gold/40 bg-white p-3 shadow-glow">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
              {looksLikeImage(data.qrImage) ? (
                <img src={data.qrImage} alt="QR Code สำหรับร่วมทำบุญ" className="h-full w-full object-contain" loading="lazy" />
              ) : (
                <div className="grid h-full place-items-center px-5 text-center text-navy">
                  <div>
                    <QrCode className="mx-auto text-gold" size={72} aria-hidden="true" />
                    <p className="mt-4 text-sm font-bold">ใส่ลิงก์รูป QR ใน Google Sheet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/12">
            <dl className="grid gap-4">
              <div>
                <dt className="text-sm text-white/60">ธนาคาร</dt>
                <dd className="text-xl font-black text-cream">{data.bankName}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">เลขบัญชี</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-3xl font-black tracking-wide text-gold">{data.bankAccount}</span>
                  <button
                    type="button"
                    onClick={copyAccount}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-4 text-sm font-black text-white transition hover:bg-[#b78324]"
                    aria-label="คัดลอกเลขบัญชี"
                  >
                    <Copy size={16} aria-hidden="true" />
                    {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">ชื่อบัญชี</dt>
                <dd className="text-xl font-black text-cream">{data.bankAccountName}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">Line OA</dt>
                <dd className="text-xl font-black text-cream">{data.lineId}</dd>
              </div>
            </dl>
            <p className="mt-5 rounded-2xl bg-white/8 px-4 py-3 text-sm leading-7 text-white/70">
              {data.slipNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MeritSection({ data }) {
  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8" aria-labelledby="merit-title">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold/15 bg-white/55 p-3 shadow-soft">
        <h2 id="merit-title" className="text-center text-base font-black text-navy">อานิสงส์แห่งการร่วมบุญ</h2>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {data.benefits.map(([title, icon]) => {
            const Icon = ICONS[icon] || Flower2;
            return (
              <div key={title} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-gold/15 bg-ivory/80 px-3 py-1.5 text-xs font-bold text-ink sm:text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-softblue text-navy">
                  <Icon size={14} aria-hidden="true" />
                </span>
                <span>{title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DonorTable({ data }) {
  const donorUpdatedDate = new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  }).format(new Date());

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="donor-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Sponsors</p>
            <h2 id="donor-title" className="mt-2 flex items-center gap-3 text-3xl font-black text-navy">
              <Heart className="text-gold" aria-hidden="true" />
              {data.donorHeading}
            </h2>
          </div>
          <p className="text-sm text-muted">อัปเดตล่าสุด {donorUpdatedDate}</p>
        </div>
        <div className="app-panel hidden overflow-hidden rounded-[1.7rem] md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gold/15">
              <thead className="bg-cream/45 text-left text-sm font-black text-navy">
                <tr>
                  <th className="px-4 py-4">ลำดับ</th>
                  <th className="px-4 py-4">ประเภท</th>
                  <th className="px-4 py-4">ชื่อ / คณะ</th>
                  <th className="px-4 py-4 text-right">จำนวนทำบุญ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-sm">
                {data.donors.length ? (
                  data.donors.map((item, index) => (
                    <tr key={`${item.order}-${item.name}-${index}`} className="transition hover:bg-softblue/45">
                      <td className="whitespace-nowrap px-4 py-4 font-bold text-gold">{item.order || index + 1}</td>
                      <td className="min-w-[220px] px-4 py-4 font-semibold text-ink">{item.type}</td>
                      <td className="min-w-[220px] px-4 py-4 text-muted">{item.name}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right font-black text-navy">{item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-muted">ยังไม่มีรายชื่อในตารางทำบุญ</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-3 md:hidden">
          {data.donors.length ? (
            data.donors.map((item, index) => (
              <article key={`${item.order}-${item.name}-${index}-card`} className="app-panel rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-muted">ลำดับ {item.order || index + 1}</p>
                    <h3 className="mt-1 text-base font-black leading-7 text-navy">{item.type}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-black text-gold">{item.amount}</span>
                </div>
                {item.name && <p className="mt-3 text-sm font-semibold leading-7 text-ink">{item.name}</p>}
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-gold/20 bg-white p-6 text-center text-muted shadow-soft">
              ยังไม่มีรายชื่อในตารางทำบุญ
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactFooter({ data }) {
  const contactLocation = "วัดหลวงพ่อสดธรรมกายาราม ตำบลแพงพวย อำเภอดำเนินสะดวก จังหวัดราชบุรี";
  const contacts = [
    { Icon: Phone, label: data.contactPhone, href: `tel:${data.contactPhone.replace(/[^0-9+]/g, "")}` },
    { Icon: MessageCircle, label: `Line OA :${data.lineId}`, href: `https://line.me/R/ti/p/${encodeURIComponent(data.lineId)}` },
    { brand: "facebook", label: `facebook:${data.facebook}`, href: `https://www.facebook.com/search/top?q=${encodeURIComponent(data.facebook)}` },
  ];
  return (
    <footer id="contact" className="bg-transparent px-4 pb-28 pt-10 sm:px-6 lg:px-8 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-gold/20 bg-ivory p-6 shadow-soft">
          <div className="flex gap-4">
            <IconBadge icon="home" />
            <div>
              <h2 className="text-2xl font-black text-navy">ติดต่อสอบถาม</h2>
              <p className="mt-2 leading-8 text-muted">{contactLocation}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {contacts.map(({ Icon, brand, label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="focus-ring flex min-h-12 items-center gap-3 rounded-2xl bg-white px-4 py-3 font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cream/60">
                {brand === "facebook" ? (
                  <span className="grid size-5 place-items-center rounded-full bg-gold text-sm font-black leading-none text-white" aria-hidden="true">f</span>
                ) : (
                  <Icon size={20} className="text-gold" aria-hidden="true" />
                )}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
        <blockquote className="grid place-items-center rounded-[2rem] border border-gold/20 bg-navy p-8 text-center text-white shadow-soft">
          <div>
            <Flower2 className="mx-auto mb-5 text-gold" size={42} aria-hidden="true" />
            <p className="text-2xl font-black leading-10">“{data.quote}”</p>
            <cite className="mt-4 block not-italic text-cream">{data.quoteBy}</cite>
          </div>
        </blockquote>
      </div>
    </footer>
  );
}

function MobileNav({ currentView, onNavigate }) {
  const items = [
    [Home, "หน้าหลัก", "home"],
    [Sparkles, "วัตถุประสงค์", "objectives"],
    [Heart, "ร่วมทำบุญ", "donate"],
    [CalendarDays, "กำหนดการ", "schedule"],
    [Phone, "ติดต่อเรา", "contact"],
  ];
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 rounded-[1.6rem] border border-gold/20 bg-white/86 px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_18px_45px_rgba(11,42,74,0.16)] backdrop-blur-xl" aria-label="เมนูล่าง">
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {items.map(([Icon, label, view]) => {
          const isActive = currentView === view;
          const isDonate = view === "donate";
          return (
            <button
              key={view}
              type="button"
              onClick={() => onNavigate(view)}
              className={`focus-ring flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-bold transition sm:text-xs ${
                isDonate
                  ? isActive
                    ? "scale-105 bg-gold text-white shadow-soft"
                    : "bg-navy text-gold shadow-soft hover:bg-navy/90"
                  : isActive
                    ? "bg-ivory text-gold"
                    : "text-navy hover:bg-ivory"
              }`}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function DataStateBanner({ loadingState }) {
  if (loadingState === "loading") {
    return (
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6 lg:px-8" role="status" aria-live="polite">
        <div className="app-panel rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full skeleton-line" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-1/2 rounded-full skeleton-line" />
              <div className="h-3 w-3/4 rounded-full skeleton-line" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingState === "error") {
    return (
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6 lg:px-8" role="alert">
        <p className="app-panel rounded-2xl px-4 py-3 text-sm font-semibold text-muted">
          ไม่สามารถดึงข้อมูลจาก Google Sheet ได้ในขณะนี้ หน้าเว็บจะแสดงข้อมูลสำรองไว้ก่อน
        </p>
      </div>
    );
  }

  return null;
}

function PageView({ currentView, data, loadingState, onNavigate }) {
  if (currentView === "objectives") {
    return (
      <>
        <ObjectiveSection data={data} />
        <MeritSection data={data} />
      </>
    );
  }

  if (currentView === "donate") {
    return <DonationSection data={data} />;
  }

  if (currentView === "schedule") {
    return (
      <>
        <ScheduleTimeline data={data} />
        <ActivitySection data={data} />
      </>
    );
  }

  if (currentView === "contact") {
    return <ContactFooter data={data} />;
  }

  return (
    <>
      <HeroSection data={data} onNavigate={onNavigate} />
      <DataStateBanner loadingState={loadingState} />
      <DonorTable data={data} />
    </>
  );
}

function viewFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (["home", "objectives", "donate", "schedule", "contact"].includes(hash)) {
    return hash;
  }
  return "home";
}

export default function VisakhaLandingPage() {
  const [rows, setRows] = useState([]);
  const [loadingState, setLoadingState] = useState("loading");
  const [currentView, setCurrentView] = useState(viewFromHash);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${SHEET_CSV_URL}&cacheBust=${Date.now()}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Sheet responded ${response.status}`);
        return response.text();
      })
      .then((csv) => {
        setRows(parseCsv(csv));
        setLoadingState("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
          setLoadingState("error");
        }
      });
    return () => controller.abort();
  }, []);

  const data = useMemo(() => buildData(rows), [rows]);
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.history.replaceState(null, "", `#${view}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-bg min-h-screen font-sans text-ink">
      <Header data={data} currentView={currentView} onNavigate={handleNavigate} />
      <main className="pb-28">
        <PageView currentView={currentView} data={data} loadingState={loadingState} onNavigate={handleNavigate} />
      </main>
      <MobileNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}
