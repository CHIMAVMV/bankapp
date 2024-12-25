import { formatAmount } from '@/lib/utils';
import React from 'react'
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
    accounts = [],
    totalBanks,
    totalCurrentBalance
}: TotalBalanceBoxProps) => {
    function formatAmbount(totalCurrentBalance: number): React.ReactNode {
        throw new Error('Function not implemented.')
    }

  return (
    <section className='total-balance' >
        <div className='total-balance-chart'>
            <DoughnutChart accounts={accounts}/>

        </div>
        <div className='flex flex-col gap-6'>
            <h2 className='header-2'>Bank Account {totalBanks}</h2>
        
        </div>
        <div className="flex flex-col gap-2">
            <p className='total-balance-label'>
                Total Current Balance
            </p>
            <div className='total-balance-amount flex-center gap-2'>
                <AnimatedCounter amount={totalCurrentBalance}/>
                {formatAmount (totalCurrentBalance)}
 
            </div>
        </div> 
    </section>
  )
}

export default TotalBalanceBox