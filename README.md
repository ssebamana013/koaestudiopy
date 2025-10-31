# KOA Estudio - Photography Client Portal

A full-stack photography client website for KOA Estudio Multimedia, allowing clients to privately view event photos, select favorites, and purchase with flexible payment options.

## Features

### Client Features
- **Private Event Galleries**: Access events with unique codes
- **Photo Protection**: Watermarked previews with anti-theft measures (right-click disabled, print screen detection)
- **Photo Selection**: Select individual photos with visual feedback
- **Flexible Checkout**: Two payment options:
  - Online payment with instant download
  - Offline payment with password-protected download
- **Download Management**: Individual or bulk download of purchased photos

### Admin Features
- **Event Management**: Create and manage photography events
- **Order Tracking**: View all orders with payment status
- **Password Generation**: Generate download passwords for offline payments
- **Dashboard**: Overview of all events and orders

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v7
- **Backend**: Supabase (Database + Auth + Storage)
- **Icons**: Lucide React

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### 2. Clone and Install
```bash
git clone <repository-url>
cd koa-estudio
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

### 4. Database Setup

The database schema has been created with the following tables:
- `events`: Photography event information
- `photos`: Individual photos for each event
- `orders`: Client purchases and payment tracking
- `download_logs`: Photo download history

The migration has already been applied. Row Level Security (RLS) is enabled on all tables.

### 5. Create Admin User

To access the admin panel, you need to create a user in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Users
3. Click "Add user" → "Create new user"
4. Enter email and password
5. Use these credentials to login at `/admin/login`

### 6. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 7. Build for Production

```bash
npm run build
```

## Usage Guide

### For Photographers (Admin)

1. **Login**: Navigate to `/admin/login` and sign in
2. **Create Event**: Click "New Event" and fill in:
   - Event title
   - Access code (auto-generated or custom)
   - Price per photo
   - Description (optional)
3. **Manage Orders**: View orders in event details
4. **Generate Passwords**: For offline payments, generate download passwords

### For Clients

1. **Access Event**: Enter event code on homepage
2. **Browse Photos**: View watermarked previews
3. **Select Photos**: Click photos to add to cart
4. **Checkout**: Enter contact info and choose payment method
5. **Payment Options**:
   - **Online**: Complete payment → instant download
   - **Offline**: Pay separately → enter password from photographer
6. **Download**: Access high-resolution photos

## Photo Upload

Photos should be uploaded to Supabase Storage or another cloud storage provider (AWS S3, Cloudinary, etc.). For each photo, you'll need:

1. **Thumbnail URL**: Low-resolution watermarked preview
2. **Full URL**: High-resolution original

Insert photo records into the `photos` table with these URLs.

### Recommended Workflow

1. Upload originals to storage
2. Generate watermarked thumbnails (add "©KOA" text overlay)
3. Insert photo records via Supabase dashboard or admin panel

## Security Features

- **Row Level Security**: All database access is restricted by policies
- **Authentication**: Admin panel requires login
- **Watermarking**: All previews display ©KOA watermark
- **Anti-theft**: Right-click disabled, drag protection, print screen detection
- **Password Protection**: Offline payments require unique passwords
- **Download Logging**: All downloads are tracked

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables

## Payment Integration

The payment page (`/payment`) currently shows a QR code placeholder. To integrate real payments:

### For Paraguay (QR Payments)

1. Integrate with a payment provider (MercadoPago, Bancard, etc.)
2. Generate QR code with payment details
3. Implement webhook to update order status
4. Replace QR placeholder in `src/pages/Payment.tsx`

### Example Payment Providers
- **MercadoPago**: Popular in Latin America
- **Stripe**: International payments
- **Bancard**: Paraguay-specific

## Customization

### Branding
- Watermark text: Search for "©KOA" in code
- Colors: Primary blue (#0070F3) defined in Tailwind classes
- Logo: Update Camera icon in navigation

### Pricing
Set per-photo prices when creating events in admin panel.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── FloatingCart.tsx
│   └── PhotoGallery.tsx
├── contexts/         # React Context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/             # Utilities and config
│   └── supabase.ts
├── pages/           # Route pages
│   ├── Home.tsx
│   ├── EventGallery.tsx
│   ├── Checkout.tsx
│   ├── Payment.tsx
│   ├── Download.tsx
│   └── admin/       # Admin panel pages
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── CreateEvent.tsx
│       └── EventDetails.tsx
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## Support

For issues or questions about KOA Estudio, contact the development team.

## License

© 2025 KOA Estudio Multimedia. All rights reserved.
