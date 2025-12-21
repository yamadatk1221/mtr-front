/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的書き出し(out/を生成)
  images: { unoptimized: true }, // next/imageを使うなら必須寄り（静的ホスト向け）
  trailingSlash: true, // /about -> /about/（S3で扱いやすい）
};

module.exports = nextConfig;
