/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_pkey",
ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("number", "street", "district", "city", "state");
