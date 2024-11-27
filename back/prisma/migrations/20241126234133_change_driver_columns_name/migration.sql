/*
  Warnings:

  - You are about to drop the column `minKm` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `ratePerKm` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `min_km` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate_per_km` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "minKm",
DROP COLUMN "ratePerKm",
ADD COLUMN     "min_km" INTEGER NOT NULL,
ADD COLUMN     "rate_per_km" DOUBLE PRECISION NOT NULL;
