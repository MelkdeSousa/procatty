/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `available_schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professionals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "available_schedules" DROP CONSTRAINT "available_schedules_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_professional_id_fkey";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "avatar" TEXT;

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "available_schedules";

-- DropTable
DROP TABLE "professionals";

-- DropTable
DROP TABLE "schedules";
