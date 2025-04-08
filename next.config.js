/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');


if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.local' });
}

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXT_PUBLIC_IMAGE_DOMAIN:', process.env.NEXT_PUBLIC_IMAGE_DOMAIN);

const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
    }
}

module.exports = nextConfig