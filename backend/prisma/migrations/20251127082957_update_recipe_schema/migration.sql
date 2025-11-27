/*
  Warnings:

  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `cookingAmount` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookingUnit` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "instructions",
ADD COLUMN     "cookingAmount" INTEGER NOT NULL,
ADD COLUMN     "cookingUnit" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" SERIAL NOT NULL,
    "step" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
