/*
  Warnings:

  - Made the column `comment` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "comment" SET NOT NULL;
