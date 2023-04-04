// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT




export interface EntityAccount {
    id: number,
    name: string,
    statement: BankStatement,
    statementId: number,
}

export interface BankStatement {
    id: number,
    entityAccount?: EntityAccount,
    items: BankStatementLine[],
}

export interface BankStatementLine {
    id: number,
    title: string,
    description?: string,
    statement: BankStatement,
    statementId: number,
    type: BankStatementLineType,
    typeId: number,
    tags: BankStatementLineTag[],
    amountCents: number,
}

export interface BankStatementLineType {
    id: number,
    name: string,
    sign: number,
    bankStatementLines: BankStatementLine[],
}

export interface BankStatementLineTag {
    id: number,
    name: string,
    bankStatementLines: BankStatementLine[],
}
