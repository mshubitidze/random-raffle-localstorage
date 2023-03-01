/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Prize` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prize_name_key" ON "Prize"("name");
