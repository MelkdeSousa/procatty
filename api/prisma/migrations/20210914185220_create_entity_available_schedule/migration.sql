/*
  Warnings:

  - You are about to drop the column `end_date` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `end_date_time` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `start_date_time` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_day` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "end_date",
DROP COLUMN "end_date_time",
DROP COLUMN "start_date",
DROP COLUMN "start_date_time",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "schedule_day" TIMESTAMP NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "available_schedules" (
    "id" UUID NOT NULL,
    "start_date_time" TIMESTAMP NOT NULL,
    "end_date_time" TIMESTAMP NOT NULL,
    "start_date" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "professional_id" UUID NOT NULL,

    CONSTRAINT "available_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedules_email_key" ON "schedules"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_telephone_key" ON "schedules"("telephone");

-- AddForeignKey
ALTER TABLE "available_schedules" ADD CONSTRAINT "available_schedules_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
