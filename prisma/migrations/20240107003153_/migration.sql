/*
  Warnings:

  - You are about to drop the column `emailAddresss` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailVerify` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_emailAddresss_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailAddresss",
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "emailVerify" BOOLEAN NOT NULL,
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");
