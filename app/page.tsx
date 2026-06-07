"use client";
import { useState } from "react";

type Screen =
  | "onboarding-1"
  | "onboarding-2"
  | "onboarding-3"
  | "home"
  | "rescue-command"
  | "give"
  | "give-2"
  | "give-3"
  | "give-confirm"
  | "take"
  | "take-recipe"
  | "take-confirm";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding-1");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a] font-mono flex flex-col items-center justify-start px-6"
      style={{ maxWidth: 430, margin: "0 auto" }}
    >
      {screen === "onboarding-1" && <Onboarding1 setScreen={setScreen} />}
      {screen === "onboarding-2" && <Onboarding2 setScreen={setScreen} />}
      {screen === "onboarding-3" && <Onboarding3 setScreen={setScreen} />}
      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "rescue-command" && <RescueCommand setScreen={setScreen} />}
      {screen === "give" && <GiveScreen setScreen={setScreen} />}
      {screen === "give-2" && <Give2Screen setScreen={setScreen} />}
      {screen === "give-3" && <Give3Screen setScreen={setScreen} />}
      {screen === "give-confirm" && <GiveConfirmScreen setScreen={setScreen} />}
      {screen === "take" && <TakeScreen setScreen={setScreen} />}
      {screen === "take-recipe" && <TakeRecipeScreen setScreen={setScreen} />}
      {screen === "take-confirm" && <TakeConfirmScreen setScreen={setScreen} />}
    </main>
  );
}

/* ── ONBOARDING 1 — הצהרה ────────────────────────────── */
function Onboarding1({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-8 py-16 min-h-screen justify-between">
      <div className="flex flex-col gap-6">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 1 מתוך 3</p>
        <h1 className="text-4xl font-black leading-tight">
          ברוכה הבאה<br />לדיקטטורה.
        </h1>
        <HalftoneDivider />
        <p className="text-sm leading-relaxed text-[#333]">
          האפליקציה הזו מבטלת את חופש הבחירה הצרכני שלך.
        </p>
        <p className="text-sm leading-relaxed text-[#333]">
          האלגוריתם מחליט מי מבשל, מתי ומה. אתה מציית.
        </p>
        <p className="text-sm leading-relaxed text-[#333]">
          בתמורה — אפס בזבוז מזון בקהילה שלך.
        </p>
        <div className="border-2 border-[#1a1a1a] p-5 bg-[#ede8e0] flex flex-col gap-3 mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#888]">את מאשרת כי:</p>
          {[
            "לא תסרבי לשום הוראת בישול שתוקצה לך",
            "כל מוצר שתעלי — חייב להיאסף",
            "סירוב = חסימה מיידית מהקהילה",
          ].map((item) => (
            <div key={item} className="flex gap-3 items-start">
              <span className="font-black mt-0.5">—</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        <p className="text-xs text-center text-[#888]">קיבתך באחריותך.</p>
        <button
          onClick={() => setScreen("onboarding-2")}
          className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-5 font-black text-base hover:bg-[#333] transition-colors"
        >
          אני מקבלת את התנאים ←
        </button>
      </div>
    </div>
  );
}

/* ── ONBOARDING 2 — הרשאות ───────────────────────────── */
function Onboarding2({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [calGranted, setCalGranted] = useState(false);
  const [locGranted, setLocGranted] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 py-16 min-h-screen justify-between">
      <div className="flex flex-col gap-6">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 2 מתוך 3</p>
        <h2 className="text-4xl font-black leading-tight">
          תני לנו<br />גישה.
        </h2>
        <HalftoneDivider />
        <p className="text-sm text-[#555] leading-relaxed">
          האלגוריתם צריך לדעת מתי את פנויה ואיפה את נמצאת כדי להקצות לך משימות בישול הוגנות.
        </p>

        <div className="flex flex-col gap-3 mt-2">
          <PermissionRow
            title="סנכרון יומן אישי"
            desc="האלגוריתם מזהה חלונות זמן פנויים ומחלק משימות בישול באופן שוויוני"
            granted={calGranted}
            onGrant={() => setCalGranted(true)}
          />
          <PermissionRow
            title="שיתוף מיקום"
            desc="מציאת מוצרים בקרבת 300 מטר בזמן אמת"
            granted={locGranted}
            onGrant={() => setLocGranted(true)}
          />
        </div>
      </div>

      <div className="pb-8">
        <button
          onClick={() => setScreen("onboarding-3")}
          disabled={!calGranted || !locGranted}
          className={`w-full py-5 font-black text-base transition-colors border-2 border-[#1a1a1a] ${
            calGranted && locGranted
              ? "bg-[#1a1a1a] text-[#f5f0e8] hover:bg-[#333]"
              : "bg-[#e0dbd3] text-[#aaa] cursor-not-allowed"
          }`}
        >
          המשך ←
        </button>
        {(!calGranted || !locGranted) && (
          <p className="text-xs text-center text-[#888] mt-2">שתי ההרשאות נדרשות להמשך</p>
        )}
      </div>
    </div>
  );
}

/* ── ONBOARDING 3 — אישור סופי ───────────────────────── */
function Onboarding3({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-8 py-16 min-h-screen justify-between">
      <div className="flex flex-col gap-6">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 3 מתוך 3</p>
        <h2 className="text-4xl font-black leading-tight">
          חתמי<br />כאן.
        </h2>
        <HalftoneDivider />

        <div className="border-2 border-[#1a1a1a] p-5 flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#888]">הצהרת משתתפת</p>
          <p className="text-sm leading-relaxed">
            אני מצהירה שאני מתגייסת למטרת הצלת מזון שכונתית ומוותרת על זכות הסירוב לכל הוראה שתוקצה לי ע"י המערכת.
          </p>
          <p className="text-sm font-black">
            אני מבינה שסירוב = חסימה מיידית.
          </p>
        </div>

        {/* Signature area */}
        <div className="border-2 border-dashed border-[#1a1a1a] h-24 flex items-center justify-center bg-[#ede8e0]">
          <p className="text-xs text-[#888]">חתימה דיגיטלית — החלק כדי לאשר</p>
        </div>
      </div>

      <div className="pb-8">
        <button
          onClick={() => setScreen("home")}
          className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-5 font-black text-base hover:bg-[#333] transition-colors"
        >
          אני נכנסת למערכת ←
        </button>
      </div>
    </div>
  );
}

/* ── HOME ─────────────────────────────────────────────── */
function HomeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-10 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest text-[#888] uppercase">
          דיקטטורה אקולוגית אלגוריתמית
        </p>
        <h1 className="text-5xl font-black leading-tight tracking-tight">
          לא<br />נזרק.
        </h1>
        <p className="text-sm text-[#555] mt-2 leading-relaxed">
          האלגוריתם בשליטה. כל מה שנכנס — יאכל.
        </p>
      </div>

      <HalftoneDivider />

      {/* Rescue command alert simulation */}
      <div
        className="w-full border-2 border-[#1a1a1a] p-4 bg-[#ede8e0] cursor-pointer hover:bg-[#e0dbd3] transition-colors"
        onClick={() => setScreen("rescue-command")}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-[#888] mb-1">פקודת הצלה פעילה</p>
        <p className="text-sm font-bold">האלגוריתם הקצה לך משימה — לחצי לפרטים</p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setScreen("give")}
          className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-5 px-6 text-right text-lg font-bold tracking-tight border-2 border-[#1a1a1a] hover:bg-[#333] transition-colors"
        >
          נשאר לי אוכל →
        </button>
        <button
          onClick={() => setScreen("take")}
          className="w-full bg-transparent text-[#1a1a1a] py-5 px-6 text-right text-lg font-bold tracking-tight border-2 border-[#1a1a1a] hover:bg-[#e8e3db] transition-colors"
        >
          אני רעב/ה, מה יש? →
        </button>
      </div>

      <div className="flex gap-6 text-center">
        <div className="flex flex-col">
          <span className="text-2xl font-black">47</span>
          <span className="text-xs text-[#888]">פריטים זמינים</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black">12</span>
          <span className="text-xs text-[#888]">דחופים היום</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black">300מ׳</span>
          <span className="text-xs text-[#888]">רדיוס שכונתי</span>
        </div>
      </div>

      <p className="text-xs text-[#aaa] text-center">קיבתך באחריותך.</p>
    </div>
  );
}

/* ── RESCUE COMMAND — פקודת הצלה ─────────────────────── */
function RescueCommand({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#1a1a1a] text-[#f5f0e8] py-16 px-0 -mx-6 w-screen justify-between"
      style={{ width: "calc(100% + 48px)", marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24 }}>

      {!confirmed ? (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs tracking-widest text-[#888] uppercase">פקודת הצלה — עכשיו</p>
              <h2 className="text-4xl font-black leading-tight text-[#f5f0e8]">
                הוקצית<br />לך משימה.
              </h2>
            </div>

            <div className="w-full flex gap-[3px] flex-wrap py-1">
              {Array.from({ length: 60 }, (_, i) => i).map((i) => (
                <div key={i} className="rounded-full bg-[#f5f0e8]"
                  style={{ width: 4, height: 4, opacity: i % 3 === 0 ? 0.8 : 0.2 }} />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-[#444] p-4 flex flex-col gap-2">
                <p className="text-xs text-[#888] uppercase tracking-wider">המתכון</p>
                <p className="text-lg font-black">פסטה ברוטב עגבניות וריקוטה</p>
                <p className="text-sm text-[#aaa]">30 דקות · 2 מנות</p>
              </div>

              <div className="border border-[#444] p-4 flex flex-col gap-2">
                <p className="text-xs text-[#888] uppercase tracking-wider">מוצרים לאיסוף</p>
                {["חצי פחית עגבניות — 80מ׳", "גבינת ריקוטה — 140מ׳"].map((i) => (
                  <p key={i} className="text-sm font-bold">{i}</p>
                ))}
              </div>

              <div className="border border-[#444] p-4 flex flex-col gap-2">
                <p className="text-xs text-[#888] uppercase tracking-wider">למה נבחרת</p>
                <p className="text-sm text-[#ccc]">
                  היומן שלך פנוי היום בין 18:00–20:00. המוצרים פוגים מחר. את הכי קרובה.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#666] leading-relaxed">
              האלגוריתם בחר אותך על בסיס זמינות, קרבה והיסטוריית השתתפות. אין אפשרות ערעור.
            </p>
          </div>

          <div className="flex flex-col gap-3 pb-8 mt-8">
            <button
              onClick={() => setConfirmed(true)}
              className="w-full bg-[#f5f0e8] text-[#1a1a1a] py-5 font-black text-base hover:bg-[#e0dbd3] transition-colors"
            >
              מאשרת — אני על זה ←
            </button>
            <p className="text-xs text-center text-[#555]">אין אפשרות ביטול</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-8 justify-center flex-1">
          <div className="w-20 h-20 border-4 border-[#f5f0e8] flex items-center justify-center mx-auto">
            <span className="text-3xl font-black">✓</span>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black">מאושר.</h2>
            <p className="text-sm text-[#aaa] mt-3 leading-relaxed">
              בעלי המוצרים קיבלו התראה.<br />
              יש לך עד 19:30 לאסוף ולבשל.
            </p>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="w-full border border-[#444] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors"
          >
            חזרה לבית
          </button>
        </div>
      )}
    </div>
  );
}

/* ── GIVE 1 — צילום ───────────────────────────────────── */
function GiveScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("home")} className="text-xs text-[#888] text-right">← חזרה</button>
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 1 מתוך 3</p>
        <h2 className="text-3xl font-black">מה נשאר לך?</h2>
      </div>
      <HalftoneDivider />
      <div className="w-full h-56 border-2 border-dashed border-[#1a1a1a] flex flex-col items-center justify-center gap-3 bg-[#ede8e0]">
        <HalftoneFood />
        <p className="text-sm text-[#555]">צלמי את המוצר</p>
        <button className="border border-[#1a1a1a] px-4 py-2 text-xs font-bold hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-colors">
          פתחי מצלמה
        </button>
      </div>
      <p className="text-xs text-[#888]">AI יזהה את המוצר אוטומטית. תוכלי לתקן אם צריך.</p>
      <button
        onClick={() => setScreen("give-2")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors"
      >
        זיהוי אוטומטי: חצי פחית עגבניות ←
      </button>
    </div>
  );
}

/* ── GIVE 2 — פרטים ───────────────────────────────────── */
function Give2Screen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [cond, setCond] = useState<string | null>(null);
  const [exp, setExp] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("give")} className="text-xs text-[#888] text-right">← חזרה</button>
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 2 מתוך 3</p>
        <h2 className="text-3xl font-black">פרטי המוצר</h2>
      </div>
      <HalftoneDivider />

      <div className="border-2 border-[#1a1a1a] px-4 py-3 font-bold bg-[#ede8e0]">חצי פחית עגבניות</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#888] uppercase tracking-wider">מצב</label>
        <div className="flex gap-2">
          {["טרי", "טוב", "אכול מהר"].map((s) => (
            <button key={s} onClick={() => setCond(s)}
              className={`flex-1 py-3 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${cond === s ? "bg-[#1a1a1a] text-[#f5f0e8]" : "hover:bg-[#e8e3db]"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#888] uppercase tracking-wider">תוקף</label>
        <div className="flex gap-2">
          {["יומיים", "שבוע", "יותר"].map((t) => (
            <button key={t} onClick={() => setExp(t)}
              className={`flex-1 py-3 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${exp === t ? "bg-[#1a1a1a] text-[#f5f0e8]" : "hover:bg-[#e8e3db]"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setScreen("give-3")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors mt-2">
        המשך ←
      </button>
    </div>
  );
}

/* ── GIVE 3 — כתובת ───────────────────────────────────── */
function Give3Screen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [pickup, setPickup] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("give-2")} className="text-xs text-[#888] text-right">← חזרה</button>
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב 3 מתוך 3</p>
        <h2 className="text-3xl font-black">כתובת איסוף</h2>
      </div>
      <HalftoneDivider />

      <div className="border-2 border-[#1a1a1a] px-4 py-3 bg-[#ede8e0]">רחוב הרצל 14, תל אביב</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#888] uppercase tracking-wider">אופן איסוף</label>
        {["השאר ליד הדלת", "תאם איתי"].map((opt) => (
          <button key={opt} onClick={() => setPickup(opt)}
            className={`w-full text-right px-4 py-3 border-2 border-[#1a1a1a] text-sm font-bold transition-colors ${pickup === opt ? "bg-[#1a1a1a] text-[#f5f0e8]" : "hover:bg-[#e8e3db]"}`}>
            {opt}
          </button>
        ))}
      </div>

      <button onClick={() => setScreen("give-confirm")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors mt-2">
        העלי למפה השכונתית ←
      </button>
    </div>
  );
}

/* ── GIVE CONFIRM ─────────────────────────────────────── */
function GiveConfirmScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-8 py-16 items-center text-center">
      <HalftoneCheck />
      <div>
        <h2 className="text-3xl font-black">הועלה.</h2>
        <p className="text-sm text-[#555] mt-3 leading-relaxed">
          חצי פחית עגבניות נמצאת עכשיו<br />על המפה השכונתית.
        </p>
        <p className="text-xs text-[#888] mt-2">
          האלגוריתם יקצה אוסף בהתאם לזמינות ומיקום.
        </p>
      </div>
      <div className="w-full border-2 border-[#1a1a1a] p-4 text-right bg-[#ede8e0]">
        <p className="text-xs text-[#888] uppercase tracking-wider mb-1">תזכורת אוטומטית</p>
        <p className="text-sm font-bold">מחר בשעה 18:00 — האם המוצר עדיין זמין?</p>
      </div>
      <HalftoneDivider />
      <button onClick={() => setScreen("home")}
        className="w-full border-2 border-[#1a1a1a] py-4 font-bold hover:bg-[#e8e3db] transition-colors">
        חזרה לבית
      </button>
    </div>
  );
}

/* ── TAKE — רשימה ─────────────────────────────────────── */
function TakeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("home")} className="text-xs text-[#888] text-right">← חזרה</button>
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">זמין עכשיו בקרבתך</p>
        <h2 className="text-3xl font-black">מה יש היום</h2>
      </div>
      <HalftoneDivider />
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">דחוף — פוג היום</p>
        {[
          { name: "חצי פחית עגבניות", distance: "80מ׳", urgency: "high" as const },
          { name: "גבינת ריקוטה", distance: "140מ׳", urgency: "high" as const },
        ].map((item) => <FoodCard key={item.name} {...item} />)}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">זמין — עוד שבוע</p>
        {[
          { name: "בצל סגול", distance: "210מ׳", urgency: "low" as const },
          { name: "שמנת חמוצה", distance: "290מ׳", urgency: "low" as const },
        ].map((item) => <FoodCard key={item.name} {...item} />)}
      </div>
      <button onClick={() => setScreen("take-recipe")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors mt-2">
        קבלי מתכון מהמאגר ←
      </button>
    </div>
  );
}

/* ── TAKE RECIPE ──────────────────────────────────────── */
function TakeRecipeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("take")} className="text-xs text-[#888] text-right">← חזרה</button>
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">מתכון מהמאגר — נוצר ע"י האלגוריתם</p>
        <h2 className="text-3xl font-black leading-tight">פסטה ברוטב<br />עגבניות וריקוטה</h2>
        <p className="text-sm text-[#555] mt-1">30 דקות · קל · 2 מנות</p>
      </div>
      <HalftoneDivider />
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">מהמאגר השכונתי</p>
        {["חצי פחית עגבניות — 80מ׳", "גבינת ריקוטה — 140מ׳"].map((i) => (
          <div key={i} className="border-r-4 border-[#1a1a1a] pr-3 py-1">
            <span className="text-sm font-bold">{i}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">תוסיפי בעצמך</p>
        {["פסטה", "שום", "שמן זית", "מלח"].map((i) => (
          <div key={i} className="border-r-4 border-[#ccc] pr-3 py-1">
            <span className="text-sm text-[#555]">{i}</span>
          </div>
        ))}
      </div>
      <HalftoneDivider />
      <button onClick={() => setScreen("take-confirm")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold hover:bg-[#333] transition-colors">
        אני לוקחת את זה ←
      </button>
    </div>
  );
}

/* ── TAKE CONFIRM ─────────────────────────────────────── */
function TakeConfirmScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <div className="border-2 border-[#1a1a1a] p-4 bg-[#ede8e0]">
        <p className="text-xs text-[#888] uppercase tracking-wider mb-1">נשלחה הודעה</p>
        <p className="text-sm font-bold">בעלי המוצרים אישרו — בואי לקחת</p>
      </div>
      <div className="border-2 border-[#1a1a1a] p-4 text-center">
        <p className="text-xs text-[#888] mb-1">קוד איסוף</p>
        <p className="text-4xl font-black tracking-widest">7429</p>
      </div>
      <div className="border-2 border-[#1a1a1a] p-4 bg-[#ede8e0]">
        <p className="text-xs text-[#888] uppercase tracking-wider mb-1">חשוב</p>
        <p className="text-sm font-bold">יש לך עד 20:00 לאסוף. אי-איסוף = הערה בפרופיל.</p>
      </div>
      <button onClick={() => setScreen("home")}
        className="w-full border-2 border-[#1a1a1a] py-4 font-bold hover:bg-[#e8e3db] transition-colors mt-4">
        חזרה לבית
      </button>
    </div>
  );
}

/* ── SHARED ───────────────────────────────────────────── */
function PermissionRow({ title, desc, granted, onGrant }: {
  title: string; desc: string; granted: boolean; onGrant: () => void;
}) {
  return (
    <div className={`border-2 p-4 flex justify-between items-start gap-4 transition-colors ${granted ? "border-[#1a1a1a] bg-[#ede8e0]" : "border-[#ccc]"}`}>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-black">{title}</p>
        <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
      </div>
      {!granted ? (
        <button onClick={onGrant}
          className="border-2 border-[#1a1a1a] px-3 py-1 text-xs font-bold hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-colors whitespace-nowrap">
          אשרי
        </button>
      ) : (
        <span className="text-xs font-black">✓</span>
      )}
    </div>
  );
}

function FoodCard({ name, distance, urgency }: { name: string; distance: string; urgency: "high" | "low" }) {
  return (
    <div className={`flex justify-between items-center border-2 px-4 py-3 ${urgency === "high" ? "border-[#1a1a1a] bg-[#ede8e0]" : "border-[#ccc]"}`}>
      <div className="flex flex-col">
        <span className="font-bold text-sm">{name}</span>
        <span className="text-xs text-[#888]">{distance} ממך</span>
      </div>
      {urgency === "high" && <span className="text-xs font-bold border border-[#1a1a1a] px-2 py-1">דחוף</span>}
    </div>
  );
}

function HalftoneDivider() {
  return (
    <div className="w-full flex gap-[3px] flex-wrap py-1">
      {Array.from({ length: 60 }, (_, i) => i).map((i) => (
        <div key={i} className="rounded-full bg-[#1a1a1a]"
          style={{ width: 4, height: 4, opacity: i % 3 === 0 ? 0.8 : 0.2 }} />
      ))}
    </div>
  );
}

function HalftoneFood() {
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(9, 1fr)", width: 80 }}>
      {Array.from({ length: 81 }, (_, i) => i).map((i) => (
        <div key={i} className="rounded-full bg-[#1a1a1a]"
          style={{ width: 6, height: 6, opacity: i % 2 === 0 ? 0.5 : 0.1 }} />
      ))}
    </div>
  );
}

function HalftoneCheck() {
  return (
    <div className="w-20 h-20 border-4 border-[#1a1a1a] flex items-center justify-center">
      <span className="text-3xl font-black">✓</span>
    </div>
  );
}
