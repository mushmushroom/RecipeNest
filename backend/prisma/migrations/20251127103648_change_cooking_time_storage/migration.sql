/*
  Warnings:

  - You are about to drop the column `cookingAmount` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cookingUnit` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `cookingTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookingAmount",
DROP COLUMN "cookingUnit",
ADD COLUMN     "cookingTime" INTEGER NOT NULL;
