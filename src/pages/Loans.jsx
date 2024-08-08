import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import MainBanner from "../components/loanFinder/MainBanner";
import Loans from "../components/loans/Loans";

export default function LoansPage() {
  return (
    <div className="page pt-0">
      <Navbar />
      <Loans />
      <Footer />
    </div>
  );
}
