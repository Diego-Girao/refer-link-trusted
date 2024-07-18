"use server";

type CheckRegistrationResponse = {
  FullName: string;
  Email: string;
  LeadEntryDateTime: Date;
};

import { generateRandomCode } from "@/lib/utils";
import { PrismaClient, ReferralRegistration } from "@prisma/client";

const prisma = new PrismaClient();

export async function CheckRegistrationByEmail(email: string) {
  console.log("Enviado", email);

  let referralRegistration: ReferralRegistration | null = null;
  referralRegistration = await prisma.referralRegistration.findUnique({
    where: {
      email: email,
    },
  });
  if (referralRegistration) {
    console.log("Encontrou", referralRegistration);
    return referralRegistration;
  } else {
    console.log("Não encontrado");

    const response = await fetch(
      `https://james-andrade.outsystemscloud.com/ReferAPIProxy/rest/Refer/CheckSubscribe?Email=${email}`,
    );

    const data = (await response.json()) as CheckRegistrationResponse;

    if (response.ok && data.FullName && data.Email) {
      const code: string = generateRandomCode();

      referralRegistration = await prisma.referralRegistration.create({
        data: {
          email: data.Email,
          fullName: data.FullName,
          referralLink:
            "https://docs.google.com/forms/d/e/1FAIpQLSffp0jsPTw0qPibbIRT2y1ZYDSd7eSeET7VxNTlpdoV17btBw/viewform?usp=pp_url&entry.1355669838=" +
            code,
          referralCode: code,
          referralsCount: 0,
        },
      });
      return referralRegistration;
    } else {
      return null;
    }
  }
}
