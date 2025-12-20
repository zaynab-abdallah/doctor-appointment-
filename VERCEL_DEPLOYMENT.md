# Vercel Deployment Guide

## المشكلة: فشل النشر (Deployment Failed)

على الأرجح أن المشكلة بسبب:
1. **متغيرات البيئة المفقودة** (خاصة Kinde Authentication)
2. أو أخطاء في البناء

## الحل 1: إضافة متغيرات البيئة في Vercel

### خطوات إضافة متغيرات البيئة:

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر المشروع (doctor-appointment)
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف المتغيرات التالية:

```
KINDE_SITE_URL=https://your-app.vercel.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://your-app.vercel.app
KINDE_POST_LOGIN_REDIRECT_URL=https://your-app.vercel.app
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
```

5. بعد إضافة المتغيرات، اذهب إلى **Deployments** وأعد النشر (Redeploy)

### ملاحظات:
- استبدل `your-app.vercel.app` بـ URL التطبيق الخاص بك من Vercel
- احصل على بيانات Kinde من [Kinde Dashboard](https://app.kinde.com)
- تأكد من إضافة Callback URLs في Kinde Dashboard:
  - `https://your-app.vercel.app/api/auth/kinde_callback`

## الحل 2: إذا كنت لا تريد استخدام Kinde الآن

إذا لم تكن تريد استخدام المصادقة الآن، يمكنك إزالة Kinde مؤقتًا:

1. عدل `app/api/auth/[kindeAuth]/route.js` ليكون:
```javascript
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ message: "Auth not configured" }, { status: 503 });
};
```

2. عدل `components/_components/Header.jsx` لإزالة استخدام Kinde مؤقتًا

## الحل 3: فحص تفاصيل الخطأ

1. في Vercel Dashboard، اضغط على **Details** بجانب "Deployment has failed"
2. اقرأ رسالة الخطأ الدقيقة
3. شاركني رسالة الخطأ لأتمكن من مساعدتك بشكل أفضل

## نصائح عامة:

- تأكد من أن جميع المتغيرات موجودة قبل النشر
- بعد إضافة المتغيرات، يجب إعادة النشر
- تحقق من Build Logs في Vercel لمعرفة الخطأ بالضبط
