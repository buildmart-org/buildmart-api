-- AlterTable
ALTER TABLE "files" ADD COLUMN "isPrimary" BOOLEAN NOT NULL DEFAULT false;

-- Update existing records to set isPrimary = true
UPDATE "files" SET "isPrimary" = true;

-- CreateIndex
CREATE INDEX "files_targetId_targetType_isPrimary_idx" ON "files"("targetId", "targetType", "isPrimary");