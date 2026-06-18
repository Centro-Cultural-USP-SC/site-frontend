/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('EXPOSICAO', 'ACERVO');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory" NOT NULL;
