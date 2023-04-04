-- CreateTable
CREATE TABLE "EntityAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "statementId" INTEGER NOT NULL,
    CONSTRAINT "EntityAccount_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "BankStatement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankStatement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "BankStatementLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "statementId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "amountCents" BIGINT NOT NULL,
    CONSTRAINT "BankStatementLine_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "BankStatement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BankStatementLine_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "BankStatementLineType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankStatementLineType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sign" INTEGER NOT NULL DEFAULT -1
);

-- CreateTable
CREATE TABLE "BankStatementLineTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BankStatementLineToBankStatementLineTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BankStatementLineToBankStatementLineTag_A_fkey" FOREIGN KEY ("A") REFERENCES "BankStatementLine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BankStatementLineToBankStatementLineTag_B_fkey" FOREIGN KEY ("B") REFERENCES "BankStatementLineTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EntityAccount_statementId_key" ON "EntityAccount"("statementId");

-- CreateIndex
CREATE UNIQUE INDEX "BankStatementLineType_name_key" ON "BankStatementLineType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BankStatementLineTag_name_key" ON "BankStatementLineTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BankStatementLineToBankStatementLineTag_AB_unique" ON "_BankStatementLineToBankStatementLineTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BankStatementLineToBankStatementLineTag_B_index" ON "_BankStatementLineToBankStatementLineTag"("B");
