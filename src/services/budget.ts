import { BudgetSplitType } from '../constants/constants';
import { useStore } from "../store/store";

export interface BudgetSplitResult {
    member: string
    amount: number
}

export abstract class BudgetSplitService {
    totalBudget;
    members;
    constructor() {
        this.totalBudget = useStore.getState().totalBudget;
        this.members = useStore.getState().members;
    }

    abstract getSplitAmounts(): BudgetSplitResult[];
}

class EqualBudgetSplitService extends BudgetSplitService {
    getSplitAmounts(): BudgetSplitResult[] {
        const splitAmount = this.totalBudget / this.members.length;
        return this.members.map(m => ({ member: m.name, amount: splitAmount }));
    }
}

export class BudgetSplitServiceFactory {
    static getBudgetSplitService(budgetSplitType: BudgetSplitType): BudgetSplitService {
        switch (Number(budgetSplitType)) {
            case BudgetSplitType.EQUALLY:
                return new EqualBudgetSplitService();
            default:
                return new EqualBudgetSplitService(); // Default method to split the budget
        }
    }
}