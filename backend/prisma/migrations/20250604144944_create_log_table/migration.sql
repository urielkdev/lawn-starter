-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "route_params" TEXT NOT NULL,
    "query_params" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
