/*
  Warnings:

  - Added the required column `subTotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'FAILED';

-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "subTotal" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" INTEGER NOT NULL;
