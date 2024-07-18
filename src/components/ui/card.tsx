"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type CardGamificationProps = {
  referralsCount: number;
};

export default function CardGamification({
  referralsCount,
}: CardGamificationProps) {
  return (
    <>
      <div className="col-auto grid justify-center gap-4 md:grid-cols-3">
        <CardGamificationItem
          title={"1 amigo"}
          icon={
            <Image
              src="dragon_coin_gold.svg"
              alt="gold dragon coin icon"
              width={135}
              height={135}
            />
          }
          description={"50 Trusted Coins"}
          active={referralsCount >= 1}
        />
        <CardGamificationItem
          title={"5 amigos"}
          icon={
            <Image
              src="james_mentoria_icon.svg"
              alt="james mentoria icon"
              width={125}
              height={125}
            />
          }
          description={"Mentoria com James"}
          active={referralsCount >= 5}
        />
        <CardGamificationItem
          title={"10 amigos"}
          icon={
            <Image
              src="kit_dragon_icon.svg"
              alt="kit dragon icon"
              width={125}
              height={125}
            />
          }
          description={"Kit Dragão"}
          active={referralsCount >= 10}
        />
      </div>
      <div className="mt-6">
        <Progress value={referralsCount * 10} />
      </div>
    </>
  );
}

type CardGamificationItemProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  active?: boolean;
};

export function CardGamificationItem({
  title,
  icon,
  description,
  active,
}: CardGamificationItemProps) {
  return (
    <div
      className={`${
        active ? "border-primary" : "border-0 bg-slate-500/5"
      } flex max-w-48 flex-col items-center justify-center gap-2 text-balance rounded-xl border-2 border-dashed bg-slate-500/10 p-4 text-base`}
    >
      <p className="font-bold">{title}</p>
      {icon}
      <p className="line-clamp-1 font-light xl:line-clamp-none">
        {description}
      </p>
    </div>
  );
}
