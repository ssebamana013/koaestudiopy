# Admin Panel Setup Guide

## 🔐 How to Access the Admin Panel

### Step 1: Navigate to Admin Login
Open your browser and go to:
- **Local Development**: `http://localhost:5173/admin/login`
- **Production**: `https://yourdomain.com/admin/login`

---

## 🚀 Creating Your First Admin Account

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Login to your project

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Users" tab

3. **Create New User**
   - Click "Add User" button
   - Fill in:
     - **Email**: Your admin email (e.g., `admin@koaestudio.com`)
     - **Password**: Choose a strong password
     - **Auto Confirm User**: ✅ Enable this
   - Click "Create User"

4. **Login to Admin Panel**
   - Go to `/admin/login`
   - Enter the email and password you just created
   - Click "Sign In"

---

### Option 2: Using Browser Console

You can also create an admin account directly from the browser console:

1. **Open the app in your browser**
2. **Open Developer Console** (F12 or Right Click → Inspect)
3. **Run this code**:

```javascript
// Replace with your desired credentials
const email = 'admin@koaestudio.com';
const password = 'YourStrongPassword123!';

// Import Supabase client
const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');

// Get your Supabase credentials from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
});

if (error) {
  console.error('Error creating admin:', error);
} else {
  console.log('Admin account created successfully!', data);
  console.log('Email:', email);
  console.log('You can now login at /admin/login');
}
```

---

### Option 3: Using SQL (Advanced)

If you need to create an admin directly in the database:

1. **Go to Supabase Dashboard → SQL Editor**
2. **Run this SQL** (Supabase will handle password hashing):

```sql
-- This creates a user in Supabase Auth
-- You'll need to do this through the Supabase Dashboard UI
-- or use the Supabase Admin API
```

**Note**: Direct SQL creation of auth users is not recommended. Use Option 1 or 2.

---

## 📋 Admin Panel Features

Once logged in, you'll have access to:

### 🏠 Dashboard (`/admin`)
- View total revenue
- See total photos uploaded
- Track completed orders
- Monitor pending orders
- View recent analytics

### ➕ Create Event (`/admin/create-event`)
- Create new photography events
- Set event name and date
- Configure pricing per photo
- Generate access codes for clients

### 📸 Event Details (`/admin/event/:eventId`)
- Upload photos to event
- View all orders for event
- Generate download passwords
- Copy access codes
- Track event statistics

### 📊 Orders Management
- View all orders by event
- See client information
- Check payment status
- Generate download passwords for offline payments

---

## 🔒 Security Notes

### Password Requirements
- Minimum 6 characters (Supabase default)
- Recommended: 12+ characters with mix of:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters

### Best Practices
1. **Use a strong, unique password**
2. **Don't share admin credentials**
3. **Enable 2FA** (if available in your Supabase plan)
4. **Regular password updates**
5. **Monitor login activity** in Supabase Dashboard

---

## 🛠️ Troubleshooting

### "Invalid login credentials"
- Double-check email and password
- Verify user was created in Supabase Auth
- Check if email confirmation is required (it shouldn't be)

### "User already exists"
- Go to Supabase Dashboard → Authentication → Users
- Search for your email
- Delete the existing user if needed
- Create a new one

### Can't access `/admin/login`
- Make sure dev server is running: `npm run dev`
- Check URL is correct: `http://localhost:5173/admin/login`
- Clear browser cache and try again

### Redirected back to login after signing in
- Check browser console for errors
- Verify AuthContext is properly set up
- Check that localStorage is not blocked

---

## 📱 Admin Panel Navigation

```
KOA Estudio Admin Structure:

┌─────────────────────────────────┐
│     /admin/login                │  ← Start here
│     (Login Page)                │
└─────────────────────────────────┘
            ↓ (after login)
┌─────────────────────────────────┐
│     /admin                      │  ← Dashboard
│     (Overview & Stats)          │
└─────────────────────────────────┘
            ↓
    ┌───────┴───────┐
    ↓               ↓
┌─────────┐   ┌──────────────┐
│ /admin/ │   │ /admin/event │
│ create- │   │ /:eventId    │
│ event   │   │              │
└─────────┘   └──────────────┘
```

---

## ✅ Quick Setup Checklist

- [ ] Go to Supabase Dashboard
- [ ] Navigate to Authentication → Users
- [ ] Click "Add User"
- [ ] Enter admin email
- [ ] Enter strong password
- [ ] Enable "Auto Confirm User"
- [ ] Create user
- [ ] Go to `/admin/login` in your app
- [ ] Sign in with credentials
- [ ] Access admin dashboard

---

## 🎯 First Steps After Login

1. **Explore the Dashboard**
   - Familiarize yourself with the layout
   - Check the statistics (will be empty initially)

2. **Create Your First Event**
   - Click "Create New Event" or "Nuevo Evento"
   - Fill in event details (name, date, pricing)
   - Generate access code
   - Save event

3. **Upload Photos**
   - Go to event details
   - Click "Upload Photos" or "Subir Fotos"
   - Select multiple photos (JPEG, PNG, WebP)
   - Upload to event

4. **Share Access Code**
   - Copy the event access code
   - Share with your clients
   - Clients can access at homepage with code

5. **Monitor Orders**
   - Check dashboard for new orders
   - Generate download passwords for offline payments
   - Track revenue and analytics

---

## 🌐 Multi-language Support

The admin panel supports both Spanish and English:
- **Spanish** (default for Paraguay market)
- **English** (toggle with language selector in top-right)

All admin features are fully translated in both languages.

---

## 📞 Need Help?

If you encounter issues:
1. Check this guide first
2. Review Supabase Dashboard for errors
3. Check browser console for error messages
4. Verify all environment variables are set in `.env`

---

**Ready to get started?** Follow Option 1 above to create your admin account through the Supabase Dashboard!
