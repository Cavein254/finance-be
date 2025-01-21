-- CreateTable
CREATE TABLE "StockName" (
    "date" DATE NOT NULL,
    "open" DOUBLE PRECISION,
    "high" DOUBLE PRECISION,
    "low" DOUBLE PRECISION,
    "close" DOUBLE PRECISION,
    "volume" BIGINT,

    CONSTRAINT "StockName_pkey" PRIMARY KEY ("date")
);

-- CreateIndex
CREATE INDEX "idx_a_date" ON "StockName"("date");
