"use client";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

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
        className={`p-6 rounded-xl shadow-lg font-semibold transform transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer ${
          myTheme === "dark" ? "text-white" : "text-black"
        }  ${gradientColor}`}
      >
        <h2 className="text-2xl">{title}</h2>
        <p className="mt-2 text-sm">{description}</p>

        <div className="w-full h-[300px] relative overflow-hidden mt-4">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="contain" // Ajusta la imagen para mantener la proporción
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
