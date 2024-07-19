-- CreateTable
CREATE TABLE "ReferralRegistration" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "referralLink" TEXT NOT NULL,
    "referralsCount" INTEGER NOT NULL,

    CONSTRAINT "ReferralRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralRegistration_email_key" ON "ReferralRegistration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralRegistration_referralCode_key" ON "ReferralRegistration"("referralCode");
