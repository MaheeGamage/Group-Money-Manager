import { BudgetSplitType } from '../constants/constants';
import { IBudgetCalculationResult, TransactionType } from '../models/TransactionRecord.model';
import { useStore } from "../store/store";

export abstract class BudgetSplitService {
    totalBudget;
    members;
    transactionRecords;
    constructor() {
        this.totalBudget = useStore.getState().totalBudget;
        this.members = useStore.getState().members;
        this.transactionRecords = useStore.getState().transactionRecords;
    }

    abstract getSplitAmounts(): IBudgetCalculationResult[];
}

class EqualBudgetSplitService extends BudgetSplitService {
    getSplitAmounts(): IBudgetCalculationResult[] {
        const splitAmount = this.totalBudget / this.members.length;
        // create final output array of member info and amount he/she need to pay
        const eachMemberPaymentList = this.members.map(member => {
            return {
                memberId: member.id,
                member: member.name,
                amount: splitAmount
            }
        })
        // Substract already paid amount from each member
        if (eachMemberPaymentList.length > 0) {
            this.transactionRecords.forEach(record => {
                if (record.type === TransactionType.PAID) {
                    const member = eachMemberPaymentList.find(member => member.memberId === record.memberId);
                    if(member)
                    member.amount -= record.amount;
                }
            })
        }

        return eachMemberPaymentList;
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