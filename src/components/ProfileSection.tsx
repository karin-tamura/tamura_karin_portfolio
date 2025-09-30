// src/components/ProfileSection.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function ProfileSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[350px,1fr,320px] gap-12 items-center">
        {/* 左：プロフィール画像（ふわふわ浮遊） */}
        <motion.div
          className="flex justify-center lg:justify-start"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-lg ring-4 ring-white">
            <Image
              src="/profile.jpg"
              alt="プロフィール画像"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* 中央：テキスト（中央寄せに変更） */}
        <div className="text-center mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-wide text-gray-900 mb-6">
            ABOUT ME
          </h2>

          <div className="text-[17px] lg:text-[18px] text-gray-800 leading-8 space-y-5 max-w-[60ch] mx-auto">
            <p>島で育ちの見習いデザイナー、田村華鈴です。</p>
            <p>人に寄り添うデザインを届けられるよう、日々学んでいます。</p>
            <p>誰もが安心して使える体験をつくることを目指しています。</p>
          </div>
        </div>

        {/* 右：猫イラスト（ふわふわ浮遊、大きめ） */}
        <motion.div
          className="flex justify-center lg:justify-end"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Image
            src="/docs/cat.png"
            alt="猫イラスト"
            width={320}
            height={320}
            className="opacity-80"
          />
        </motion.div>
      </div>
    </section>
  );
}
