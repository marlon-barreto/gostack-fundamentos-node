import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transation => transation.type === 'income',
    );

    const outcomes = this.transactions.filter(
      transation => transation.type === 'outcome',
    );

    const totalIncomes = incomes.reduce((total: number, item: Transaction) => {
      return total + item.value;
    }, 0);

    const totalOutcomes = outcomes.reduce(
      (total: number, item: Transaction) => {
        return total + item.value;
      },
      0,
    );

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
