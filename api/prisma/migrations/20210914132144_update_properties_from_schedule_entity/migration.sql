/*
  Warnings:

  - Added the required column `end_date_time` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date_time` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "end_date_time" TIMESTAMP NOT NULL,
ADD COLUMN     "start_date_time" TIMESTAMP NOT NULL;
