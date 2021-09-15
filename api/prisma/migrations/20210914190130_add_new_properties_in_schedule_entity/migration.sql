/*
  Warnings:

  - You are about to drop the column `schedule_day` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date_time` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date_time` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "schedule_day",
ADD COLUMN     "end_date" TEXT NOT NULL,
ADD COLUMN     "end_date_time" TIMESTAMP NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL,
ADD COLUMN     "start_date_time" TIMESTAMP NOT NULL;
