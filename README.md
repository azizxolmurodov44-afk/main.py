# Qon Hayoti

O‘zbek tilidagi statik qon donorligi demo sayti. Saytda demo qon ehtiyojlari, filtrlar, donorlik jarayoni, FAQ va e’lon shakli mavjud. Shaxsiy yoki sog‘liq ma’lumotlari serverga yuborilmaydi.

## Dasturlash testlari

`quiz.html` sahifasida Python bo‘yicha 120 ta, HTML bo‘yicha 50 ta savol mavjud. Yakuniy tahlilda to‘g‘ri javoblar va tushuntirishlar ko‘rsatiladi. Foydalanuvchi o‘z savollari bilan ham test tuzishi, yorug‘ va qora fonni almashtirishi mumkin.

Hozircha test yaratuvchida qo‘shilgan savollar faqat sahifa ochiq turganda xotirada saqlanadi; sahifani yangilaganda yo‘qoladi va boshqa foydalanuvchilarga ko‘rinmaydi. Ularni hamma uchun saqlash uchun server tomondagi API va ma’lumotlar bazasi (masalan, Supabase), loyiha URL’i, publishable/anon kalit, jadval sxemasi, xavfsiz RLS siyosatlari hamda yozuvlarni cheklash/tasdiqlash qoidalari kerak bo‘ladi. Service-role kabi maxfiy kalitlar hech qachon brauzer kodiga qo‘yilmasligi lozim. Hozir repoda bunday backend yoki sozlamalar mavjud emas.

## Ishga tushirish

Loyiha qo‘shimcha paket talab qilmaydi:

```powershell
python -m http.server 8080
```

Brauzerda `http://localhost:8080` ni oching.
