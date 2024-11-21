/*
  Warnings:

  - You are about to alter the column `title` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[title]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "event_title_key" ON "event"("title");
