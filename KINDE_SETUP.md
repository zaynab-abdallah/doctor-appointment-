# Kinde Authentication Setup

## Error: Missing KINDE_ISSUER_URL

To fix this error, you need to set up Kinde authentication environment variables.

## Option 1: Set up Kinde (Recommended if you want authentication)

1. Create a `.env.local` file in the root of your project (`appointment_app` folder)

2. Add the following environment variables:

```env
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000
KINDE_CLIENT_ID=your_kinde_client_id_here
KINDE_CLIENT_SECRET=your_kinde_client_secret_here
KINDE_ISSUER_URL=https://your-domain.kinde.com
```

3. Get your Kinde credentials from: https://app.kinde.com
   - Sign up or log in to Kinde
   - Create a new application
   - Copy your Client ID, Client Secret, and Issuer URL
   - Replace the placeholder values in `.env.local`

4. Restart your dev server after adding the environment variables

## Option 2: Remove Kinde (If you don't need authentication)

If you don't need authentication, you can remove Kinde:

1. Remove the Kinde imports from `components/_components/Header.jsx`
2. Replace `<LoginLink><Button>Get Started</Button></LoginLink>` with just `<Button>Get Started</Button>`
3. Delete the route file: `app/api/auth/[kindeAuth]/route.js`
4. Uninstall the package: `npm uninstall @kinde-oss/kinde-auth-nextjs`
