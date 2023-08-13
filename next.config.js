/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    unoptimized: true,
    images:{
        domains:['maps.googleapis.com']
    }
}

module.exports = nextConfig