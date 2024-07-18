"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckRegistrationByEmail } from "./actions";
import { useState } from "react";
import { ReferralRegistration } from "@prisma/client";
import { ModeToggle } from "@/components/ui/mode-toogle";
import Card from "@/components/ui/card";
import { Copy, LoaderCircle, UsersIcon } from "lucide-react";

export default function Home() {
  const [referralRegistration, setReferralRegistration] =
    useState<ReferralRegistration | null>();

  const [alreadyCheckedCode, setAlreadyCheckedCode] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerateCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (typeof email === "string") {
      setLoading(true);
      const referralRegistrationOut = await CheckRegistrationByEmail(email);
      setReferralRegistration(referralRegistrationOut);
      setAlreadyCheckedCode(true);
      setLoading(false);
    } else {
      console.error("Invalid email address");
    }
  }
  function handleCopyCode(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="m-4 max-w-2xl space-y-6 rounded-xl bg-secondary p-8">
        <div className="-m-8 text-end">
          <ModeToggle />
        </div>
        <div className="flex justify-center">
          <Image
            src="logo_jornada_dragao.svg"
            alt=""
            width={453}
            height={212}
          />
        </div>
        <form onSubmit={handleGenerateCode}>
          <div className="flex gap-4">
            <Input type="email" name="email" placeholder="Digite seu email" />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Gerar Código"
              )}
            </Button>
          </div>
        </form>

        <div>
          {alreadyCheckedCode ? (
            referralRegistration ? (
              <>
                <p className="text-balance text-center">
                  🐲 Olá{" "}
                  <span className="font-medium capitalize text-primary">
                    {referralRegistration.fullName},
                  </span>{" "}
                  você já está registado na nossa jornada, aproveite para
                  compartilhar com outros amigos e ganhar prêmios!🎁🏆
                </p>
                <div className="mb-4 p-4" id="registerInformation">
                  <div className="mt-4 flex">
                    <p className="basis-1/2 text-left">Código amigo: </p>
                    <div className="flex basis-1/2 items-center justify-end gap-3">
                      <p>{referralRegistration.referralCode}</p>
                      <Copy
                        onClick={() =>
                          handleCopyCode(referralRegistration.referralCode)
                        }
                        className="cursor-pointer hover:text-primary"
                        size={18}
                      ></Copy>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    <p className="basis-1/2 text-left">Link: </p>
                    <div className="flex basis-1/2 items-center justify-end gap-3">
                      <a
                        className="underline decoration-primary decoration-wavy underline-offset-[5px] duration-300 ease-in-out hover:text-primary hover:decoration-slate-500"
                        href={referralRegistration.referralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link amigo
                      </a>
                      <Copy
                        onClick={() =>
                          handleCopyCode(referralRegistration.referralLink)
                        }
                        className="cursor-pointer hover:text-primary"
                        size={18}
                      ></Copy>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    <p className="basis-1/2 text-left">Indicações: </p>
                    <div className="flex basis-1/2 items-center justify-end gap-3">
                      <p>{referralRegistration.referralsCount}</p>
                      <UsersIcon></UsersIcon>
                    </div>
                  </div>
                </div>
                <Card
                  referralsCount={referralRegistration.referralsCount}
                ></Card>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="font-medium">
                  Ops...você ainda não está registado na nossa jornada.😢
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffp0jsPTw0qPibbIRT2y1ZYDSd7eSeET7VxNTlpdoV17btBw/viewform"
                  target="_blank"
                >
                  <Button>Clique aqui para registar</Button>
                </a>
              </div>
            )
          ) : null}
        </div>
      </div>
    </main>
  );
}
