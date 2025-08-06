import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import ArticlesList from "@/components/ArticlesList";
import HowItWorks from "@/components/HowItWorks";
import Rights from "@/components/Rights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Experience />
        <ArticlesList />
        <HowItWorks />
        <Rights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
