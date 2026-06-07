"use client";
import { useState } from "react";

type Screen = "home" | "give" | "give-confirm" | "take" | "take-recipe";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a] font-mono flex flex-col items-center justify-center px-6"
      style={{ maxWidth: 430, margin: "0 auto" }}
    >
      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "give" && <GiveScreen setScreen={setScreen} />}
      {screen === "give-confirm" && <GiveConfirmScreen setScreen={setScreen} />}
      {screen === "take" && <TakeScreen setScreen={setScreen} />}
      {screen === "take-recipe" && <TakeRecipeScreen setScreen={setScreen} />}
    </main>
  );
}

/* ── HOME ─────────────────────────────────────────────── */
function HomeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-10 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest text-[#888] uppercase">
          פלטפורמת הצלת מזון שכונתית
        </p>
        <h1 className="text-5xl font-black leading-tight tracking-tight">
          לא<br />נזרק.
        </h1>
        <p className="text-sm text-[#555] mt-2 leading-relaxed">
          כל מה שנכנס פה — יאכל.
        </p>
      </div>

      <HalftoneDivider />

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

/* ── GIVE ─────────────────────────────────────────────── */
function GiveScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedExpiry, setSelectedExpiry] = useState<string | null>(null);
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("home")} className="text-xs text-[#888] text-right">
        ← חזרה
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">שלב {step} מתוך 3</p>
        <h2 className="text-3xl font-black leading-tight">
          {step === 1 && "מה נשאר לך?"}
          {step === 2 && "פרטי המוצר"}
          {step === 3 && "כתובת איסוף"}
        </h2>
      </div>

      <HalftoneDivider />

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div className="w-full h-56 border-2 border-dashed border-[#1a1a1a] flex flex-col items-center justify-center gap-3 bg-[#ede8e0]">
            <HalftoneFood />
            <p className="text-sm text-[#555]">צלמי את המוצר</p>
            <button className="border border-[#1a1a1a] px-4 py-2 text-xs font-bold hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-colors">
              פתחי מצלמה
            </button>
          </div>
          <p className="text-xs text-[#888]">
            AI יזהה את המוצר אוטומטית. תוכלי לתקן אם צריך.
          </p>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold text-base hover:bg-[#333] transition-colors"
          >
            זיהוי אוטומטי: חצי פחית עגבניות ←
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider">מוצר</label>
            <div className="border-2 border-[#1a1a1a] px-4 py-3 text-base font-bold bg-[#ede8e0]">
              חצי פחית עגבניות
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider">מצב המוצר</label>
            <div className="flex gap-2">
              {["טרי", "טוב", "אכול מהר"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedCondition(s)}
                  className={`flex-1 py-3 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${
                    selectedCondition === s
                      ? "bg-[#1a1a1a] text-[#f5f0e8]"
                      : "bg-transparent hover:bg-[#e8e3db]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider">תוקף</label>
            <div className="flex gap-2">
              {["יומיים", "שבוע", "יותר"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedExpiry(t)}
                  className={`flex-1 py-3 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${
                    selectedExpiry === t
                      ? "bg-[#1a1a1a] text-[#f5f0e8]"
                      : "bg-transparent hover:bg-[#e8e3db]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold text-base hover:bg-[#333] transition-colors mt-2"
          >
            המשך ←
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider">כתובת</label>
            <div className="border-2 border-[#1a1a1a] px-4 py-3 text-base bg-[#ede8e0]">
              רחוב הרצל 14, תל אביב
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider">אופן איסוף</label>
            {["השאר ליד הדלת", "תאם איתי"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedPickup(opt)}
                className={`w-full text-right px-4 py-3 border-2 border-[#1a1a1a] text-sm font-bold transition-colors ${
                  selectedPickup === opt
                    ? "bg-[#1a1a1a] text-[#f5f0e8]"
                    : "hover:bg-[#e8e3db]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={() => setScreen("give-confirm")}
            className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold text-base hover:bg-[#333] transition-colors mt-2"
          >
            העלי למפה השכונתית ←
          </button>
        </div>
      )}
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
          חצי פחית עגבניות נמצאת עכשיו<br />
          על המפה השכונתית.
        </p>
      </div>

      <div className="w-full border-2 border-[#1a1a1a] p-4 text-right bg-[#ede8e0] flex flex-col gap-1">
        <p className="text-xs text-[#888] uppercase tracking-wider">תזכורת אוטומטית</p>
        <p className="text-sm font-bold">מחר בשעה 18:00 נשאל אם המוצר עדיין זמין</p>
      </div>

      <HalftoneDivider />

      <button
        onClick={() => setScreen("home")}
        className="w-full border-2 border-[#1a1a1a] py-4 font-bold text-base hover:bg-[#e8e3db] transition-colors"
      >
        חזרה לבית
      </button>
    </div>
  );
}

/* ── TAKE ─────────────────────────────────────────────── */
function TakeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("home")} className="text-xs text-[#888] text-right">
        ← חזרה
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">זמין עכשיו בקרבתך</p>
        <h2 className="text-3xl font-black leading-tight">מה יש היום</h2>
      </div>

      <HalftoneDivider />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">דחוף — פוג היום</p>
        {[
          { name: "חצי פחית עגבניות", distance: "80מ׳", urgency: "high" as const },
          { name: "גבינת ריקוטה", distance: "140מ׳", urgency: "high" as const },
        ].map((item) => (
          <FoodCard key={item.name} {...item} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#888] uppercase tracking-wider">זמין — עוד שבוע</p>
        {[
          { name: "בצל סגול", distance: "210מ׳", urgency: "low" as const },
          { name: "שמנת חמוצה", distance: "290מ׳", urgency: "low" as const },
        ].map((item) => (
          <FoodCard key={item.name} {...item} />
        ))}
      </div>

      <button
        onClick={() => setScreen("take-recipe")}
        className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold text-base hover:bg-[#333] transition-colors mt-2"
      >
        קבלי מתכון מהמאגר ←
      </button>
    </div>
  );
}

/* ── TAKE RECIPE ──────────────────────────────────────── */
function TakeRecipeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 py-12">
      <button onClick={() => setScreen("take")} className="text-xs text-[#888] text-right">
        ← חזרה
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest text-[#888] uppercase">מתכון מהמאגר</p>
        <h2 className="text-3xl font-black leading-tight">
          פסטה ברוטב<br />עגבניות וריקוטה
        </h2>
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

      {!confirmed ? (
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 font-bold text-base hover:bg-[#333] transition-colors"
        >
          אני לוקחת את זה ←
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="border-2 border-[#1a1a1a] p-4 bg-[#ede8e0]">
            <p className="text-xs text-[#888] uppercase tracking-wider mb-1">נשלחה הודעה</p>
            <p className="text-sm font-bold">בעלי המוצרים אישרו — בואי לקחת</p>
          </div>
          <div className="border-2 border-[#1a1a1a] p-4 text-center">
            <p className="text-xs text-[#888] mb-1">קוד איסוף</p>
            <p className="text-4xl font-black tracking-widest">7429</p>
          </div>
          <button
            onClick={() => setScreen("home")}
            className="w-full border-2 border-[#1a1a1a] py-4 font-bold hover:bg-[#e8e3db] transition-colors"
          >
            חזרה לבית
          </button>
        </div>
      )}
    </div>
  );
}

/* ── SHARED COMPONENTS ────────────────────────────────── */
function FoodCard({
  name,
  distance,
  urgency,
}: {
  name: string;
  distance: string;
  urgency: "high" | "low";
}) {
  return (
    <div
      className={`flex justify-between items-center border-2 px-4 py-3 ${
        urgency === "high" ? "border-[#1a1a1a] bg-[#ede8e0]" : "border-[#ccc]"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-bold text-sm">{name}</span>
        <span className="text-xs text-[#888]">{distance} ממך</span>
      </div>
      {urgency === "high" && (
        <span className="text-xs font-bold border border-[#1a1a1a] px-2 py-1">דחוף</span>
      )}
    </div>
  );
}

function HalftoneDivider() {
  const dots = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="w-full flex gap-[3px] flex-wrap py-1">
      {dots.map((i) => (
        <div
          key={i}
          className="rounded-full bg-[#1a1a1a]"
          style={{ width: 4, height: 4, opacity: i % 3 === 0 ? 0.8 : 0.2 }}
        />
      ))}
    </div>
  );
}

function HalftoneFood() {
  const dots = Array.from({ length: 81 }, (_, i) => i);
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(9, 1fr)", width: 80 }}>
      {dots.map((i) => (
        <div
          key={i}
          className="rounded-full bg-[#1a1a1a]"
          style={{ width: 6, height: 6, opacity: i % 2 === 0 ? 0.5 : 0.1 }}
        />
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
