import HeaderBox from "@/components/ui/HeaderBox"
import TotalBalanceBox from "@/components/ui/TotalBalanceBox"

const Home = () => {
    const loggedin = { firstName: 'Chima' }
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox
                    type="greeting"
                    title="Welcome to Horizon,"
                    user={loggedin?.firstName || 'Guest'}
                    subtext="Your personal finance dashboard"
                />
                <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250}
                
                />

            </header>
        </div>
    </section>
  )
}

export default Home
