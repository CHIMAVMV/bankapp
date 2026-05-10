import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

type HomePageProps = {
  searchParams: Promise<{ id?: string; page?: string }>;
};

const Home = async ({ searchParams }: HomePageProps) => {
  const { id, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect('/sign-in');
  const currentUser = loggedIn as unknown as User;
  const accounts = await getAccounts({ 
    userId: currentUser.$id 
  }) as { data: Account[]; totalBanks: number; totalCurrentBalance: number } | undefined;

  if (!accounts || accounts.data.length === 0) return null;
  
  const accountsData = accounts.data;
  const appwriteItemId = id || accountsData[0].appwriteItemId;

  const account = await getAccount({ appwriteItemId }) as { data: Account; transactions: Transaction[] } | undefined;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
            <HeaderBox 
              type="greeting"
              title="Welcome"
              user={currentUser.firstName || 'Guest'}
              subtext="Access and manage your account and transactions efficiently."
            />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions ?? []}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={currentUser}
        transactions={account?.transactions ?? []}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home
