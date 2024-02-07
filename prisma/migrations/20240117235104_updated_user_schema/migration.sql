/*
  Warnings:

  - The `Image` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lastLoginAttempts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loginAttempts` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productid]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `views` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "Image",
ADD COLUMN     "Image" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLoginAttempts",
DROP COLUMN "loginAttempts",
ADD COLUMN     "pin" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_productId_key" ON "Cart"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_productid_key" ON "Image"("productid");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_userId_key" ON "Product"("userId");
