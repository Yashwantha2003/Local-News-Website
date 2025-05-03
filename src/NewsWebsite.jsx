import React, { useState } from 'react';
import './NewsWebsite.css';

const NewsWebsite = () => {
  // Initial news data
  const initialNews = {
    international: [
      { 
        id: 1, 
        title: 'Global Climate Summit Concludes', 
        content: 'World leaders agree on new emission targets to combat climate change.', 
        imageUrl: 'https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2023/12/15174051/cop28.jpeg',
        date: '2025-05-01' 
      },
      { 
        id: 2, 
        title: 'International Space Mission Launched', 
        content: 'Joint expedition to study deep space phenomena sets off from international space station.', 
        imageUrl: 'https://cosmiclog.com/wp-content/uploads/2018/04/180401-spacex.jpg',
        date: '2025-04-29' 
      },
      { 
        id: 3, 
        title: 'Global Trade Agreement Signed', 
        content: 'Major economies reach consensus on new trade regulations and tariff reductions.', 
        imageUrl: 'https://www.edomarketplace.net/images/c1ac711317fc31f057918f6efef2ddaa57d84fb6.png',
        date: '2025-04-27' 
      }
    ],
    national: [
      { 
        id: 1, 
        title: 'New Infrastructure Bill Passed', 
        content: 'Landmark legislation aims to rebuild aging infrastructure across the country.', 
        imageUrl: 'https://static.wixstatic.com/media/4b337a_d7a55929861c458facae8020b5a9aa4c~mv2.png/v1/fill/w_1000,h_667,al_c,usm_0.66_1.00_0.01/4b337a_d7a55929861c458facae8020b5a9aa4c~mv2.png',
        date: '2025-05-02' 
      },
      { 
        id: 2, 
        title: 'Economic Growth Exceeds Expectations', 
        content: 'GDP growth surpasses forecasts for the second quarter, indicating strong recovery.', 
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.farVAQdlMGwzzW61dEQTMAHaDn&pid=Api&P=0&h=180',
        date: '2025-04-30' 
      },
      { 
        id: 3, 
        title: 'National Education Reform Announced', 
        content: 'Government unveils new plan to improve education standards nationwide.', 
        imageUrl: 'https://www.acadecraft.com/blog/uploads/blog/2023/06/implementation-of-nep-2020-in-schools-64872434c0e0cwebp.webp',
        date: '2025-04-28' 
      }
    ],
    local: [
      { 
        id: 1, 
        title: 'Community Park Renovation Complete', 
        content: 'Grand reopening scheduled for this weekend with family activities and food vendors.', 
        imageUrl: 'https://www.vanir.com/wp-content/uploads/201505-20170706-010-1024x575.jpg',
        date: '2025-05-01' 
      },
      { 
        id: 2, 
        title: 'Local School Wins Science Competition', 
        content: 'Students advance to national finals next month after impressive regional performance.', 
        imageUrl: 'https://patch.com/img/cdn20/inline_images/127241/1489742525.jpg',
        date: '2025-04-28' 
      }
    ]
  };

  // State for active category and news data
  const [activeCategory, setActiveCategory] = useState('international');
  const [news, setNews] = useState(initialNews);
  
  // State for form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('/api/placeholder/800/500');

  // Function to handle adding news
  const handleAddNews = (e) => {
    e.preventDefault();
    
    if (newTitle && newContent) {
      const newNewsItem = {
        id: Date.now(), // Use timestamp as unique ID
        title: newTitle,
        content: newContent,
        imageUrl: newImageUrl || '/api/placeholder/800/500',
        date: new Date().toISOString().slice(0, 10) // Format as YYYY-MM-DD
      };

      // Update the news state with the new item
      setNews(prevNews => ({
        ...prevNews,
        [activeCategory]: [...prevNews[activeCategory], newNewsItem]
      }));

      // Reset form fields
      setNewTitle('');
      setNewContent('');
      setNewImageUrl('/api/placeholder/800/500');
    }
  };

  // Header Component
  const Header = () => (
    <header className="header">
      <div className="logo">
        <h1>World News Network</h1>
      </div>
      <div className="date">
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </header>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="main-nav">
      <ul>
        <li className={activeCategory === 'international' ? 'active' : ''}>
          <button onClick={() => setActiveCategory('international')}>International</button>
        </li>
        <li className={activeCategory === 'national' ? 'active' : ''}>
          <button onClick={() => setActiveCategory('national')}>National</button>
        </li>
        <li className={activeCategory === 'local' ? 'active' : ''}>
          <button onClick={() => setActiveCategory('local')}>Local</button>
        </li>
      </ul>
    </nav>
  );

  // News Card Component
  const NewsCard = ({ title, content, imageUrl, date }) => (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{content}</p>
        <span className="news-date">{date}</span>
      </div>
    </div>
  );

  // News Form Component
  const NewsForm = () => (
    <div className="news-form-container">
      <h2>Submit {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News</h2>
      <form className="news-form" onSubmit={handleAddNews}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input
            type="text"
            id="imageUrl"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Submit News</button>
      </form>
    </div>
  );

  // News Section Component
  const NewsSection = () => (
    <div className="news-section">
      <h2 className="category-title">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News</h2>
      <div className="news-container">
        {news[activeCategory].map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            content={item.content}
            imageUrl={item.imageUrl}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} World News Network. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="news-website">
      <Header />
      <Navigation />
      <main>
        <NewsSection />
        <NewsForm />
      </main>
      <Footer />
    </div>
  );
};

export default NewsWebsite;