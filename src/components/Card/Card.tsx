"use client";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  gradientColor: string;
  link: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  gradientColor,
  link,
}) => {
  return (
    <Link href={link}>
      <div
        className={`p-6 rounded-xl shadow-lg font-semibold transform transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer text-white`}
        style={{
          backgroundImage: gradientColor,
        }}
      >
        <h2 className="text-2xl">{title}</h2>
        <p className="mt-2 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
