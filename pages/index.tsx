import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { UserInfoCard } from '../src/components/cards/userInfoCard'
import { ExpenseRecordsTable } from '../src/components/expenseRecordsTable'
import NavWithSidebarLayout from '../layouts/navWithSidebarLayout'
import { NextPageWithLayout } from './_app'
import { BudgetSplitType } from '../src/constants/constants'
import { BudgetSplitServiceFactory } from '../src/services/budgetService'
import Modal, { ModalAction } from '../src/components/Modal/Modal'
import { IBudgetCalculationResult } from '../src/models/TransactionRecord.model'

const SampleHome: NextPageWithLayout = () => {

  const [showBudgetCalculations, setShowBudgetCalculations] = useState(false);
  const [budgetCalculationResults, setBudgetCalculationResults] = useState<IBudgetCalculationResult[]>([]);

  const handleBudgetCalculate = () => {
    const budgetCalculateService = BudgetSplitServiceFactory.getBudgetSplitService(BudgetSplitType.EQUALLY)
    setBudgetCalculationResults(budgetCalculateService.getSplitAmounts());
    setShowBudgetCalculations(true)
  }

  const handleModalEvents = (action: ModalAction) => {
    switch (action) {
      case ModalAction.CLOSE:
        setShowBudgetCalculations(false);
    }
  }

  return (
    <>
      <Modal
        showModal={showBudgetCalculations}
        onModalEvent={handleModalEvents}
      >
        {budgetCalculationResults.map(result => {
          const resultString = `${result.member} need to pay ${result.amount}`
          return (
            <p key={result.memberId}>{resultString}</p>
          )
        })}
      </Modal>
      <Head>
        <title>Group Budget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 max-w-5xl">

        {/* Basic info card */}
        <UserInfoCard />

        <div className='flex mt-8 justify-around'>
          <button className="btn btn-outline btn-success mx-1 grow"
            onClick={handleBudgetCalculate}
          >
            Calculate
          </button>
        </div>

        <div className="overflow-x-auto w-full mt-8">
          <ExpenseRecordsTable />
        </div>

      </div>

    </>
  )
}

SampleHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavWithSidebarLayout>
      {page}
    </NavWithSidebarLayout>
  )
}

export default SampleHome
