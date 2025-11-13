"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

interface CardProps {
  title: string;
  description: string;
  gradientColor: string;
  link: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  gradientColor,
  link,
  imageUrl,
}) => {
  const { myTheme } = useTheme();

  return (
    <Link href={link}>
      <div
        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer h-full ${gradientColor} ${
          myTheme === "dark" ? "border border-gray-700" : "border border-gray-200"
        }`}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <h3 className={`text-xl font-bold mb-3 ${
              myTheme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              {title}
            </h3>
            
            <p className={`text-sm leading-relaxed flex-1 ${
              myTheme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              {description}
            </p>
          </div>

          {/* Action Indicator */}
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-sm font-semibold ${
              myTheme === "dark" ? "text-cyan-400" : "text-blue-600"
            }`}>
              Explore →
            </span>
          </div>
        </div>

        {/* Hover Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full`}></div>
      </div>
    </Link>
  );
};

export default Card;