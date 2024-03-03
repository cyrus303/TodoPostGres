-- CreateTable
CREATE TABLE "TodoModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TodoModel_pkey" PRIMARY KEY ("id")
);
