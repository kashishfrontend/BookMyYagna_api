// SingleBlogPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import blog1 from '../../assets/img/bg--2.webp';
import '../../assets/css/SingleBlogPage.css'; // We'll create this CSS file

const SingleBlogPage = () => {
  const { id } = useParams();
  
  // Sample blog data with more content
  const blog = {
    id: 1,
    title: "मंगल दोष शांति के 5 आसान उपाय",
    image: blog1,
    content: `
      <p class="blog-intro">ज्योतिष शास्त्र में मंगल दोष को एक गंभीर समस्या माना जाता है जो व्यक्ति के जीवन के विभिन्न पहलुओं को प्रभावित कर सकता है। कुंडली में मंगल ग्रह के अशुभ प्रभाव को दर्शाने वाला यह दोष विशेष रूप से विवाहित जीवन और स्वास्थ्य पर बुरा असर डाल सकता है।</p>
      
      <div class="highlight-box">
        <h3>क्या आप जानते हैं?</h3>
        <p>मंगल दोष केवल कुंडली के पहले, चौथे, सातवें, आठवें या बारहवें भाव में मंगल के स्थित होने पर ही बनता है। इसे 'कुजा दोष' भी कहा जाता है।</p>
      </div>
      
      <h2>मंगल दोष के प्रमुख लक्षण</h2>
      <ul class="symptoms-list">
        <li>विवाह में अत्यधिक देरी या रुकावटें</li>
        <li>वैवाहिक जीवन में अशांति और तनाव</li>
        <li>पारिवारिक कलह और मनमुटाव</li>
        <li>कार्यक्षेत्र में बार-बार बदलाव</li>
        <li>अचानक दुर्घटनाओं का खतरा</li>
        <li>धन की हानि या अचानक व्यय</li>
      </ul>
      
      <div class="image-with-caption">
        <img src="${blog1}" alt="मंगल दोष शांति" />
        <p class="caption">हनुमान जी की पूजा मंगल दोष शांति में विशेष लाभकारी</p>
      </div>
      
      <h2>मंगल दोष शांति के 5 प्रभावी उपाय</h2>
      <ol class="remedies-list">
        <li>
          <h3>हनुमान चालीसा का नियमित पाठ</h3>
          <p>प्रतिदिन हनुमान चालीसा का पाठ करें, विशेषकर मंगलवार को। हनुमान जी मंगल के प्रतिनिधि हैं और उनकी उपासना से मंगल का अशुभ प्रभाव कम होता है।</p>
        </li>
        <li>
          <h3>मंगलवार को लाल वस्त्र दान</h3>
          <p>प्रत्येक मंगलवार को लाल रंग के वस्त्र, गुड़, मसूर की दाल या तांबे के बर्तन दान करें। यह मंगल की शांति के लिए अत्यंत शुभ माना जाता है।</p>
        </li>
        <li>
          <h3>मूंगा धारण करना</h3>
          <p>विधि-विधान से मूंगा धारण करें। मूंगा मंगल का रत्न है और इसे धारण करने से मंगल का बुरा प्रभाव कम होता है।</p>
        </li>
        <li>
          <h3>नवग्रह मंत्र का जाप</h3>
          <p>मंगल के बीज मंत्र "ॐ क्रां क्रीं क्रौं सः भौमाय नमः" का 108 बार जाप करें। यह मंत्र मंगल की शुभता को बढ़ाता है।</p>
        </li>
        <li>
          <h3>मंगल यंत्र की स्थापना</h3>
          <p>किसी योग्य ज्योतिषी की सलाह से मंगल यंत्र स्थापित करें और नियमित रूप से इसकी पूजा करें।</p>
        </li>
      </ol>
      
      <div class="quote-box">
        <p>"मंगल दोष जन्म कुंडली में एक चुनौती है, लेकिन सही उपाय और सकारात्मक दृष्टिकोण से इसके प्रभाव को कम किया जा सकता है।"</p>
        <p class="author">- पंडित रामदेव</p>
      </div>
      
      <h2>मंगल दोष से संबंधित सामान्य प्रश्न</h2>
      <div class="faq">
        <div class="faq-item">
          <h3>क्या मंगल दोष सभी कुंडलियों में समान प्रभाव डालता है?</h3>
          <p>नहीं, मंगल दोष का प्रभाव कुंडली में मंगल की स्थिति, बल और अन्य ग्रहों के साथ संबंध पर निर्भर करता है।</p>
        </div>
        <div class="faq-item">
          <h3>क्या मंगल दोष के कारण विवाह टूट सकता है?</h3>
          <p>मंगल दोष वैवाहिक जीवन में कठिनाइयाँ ला सकता है, लेकिन सही उपाय और समझदारी से इस स्थिति को संभाला जा सकता है।</p>
        </div>
      </div>
    `,
    author: "पंडित रामदेव",
    date: "15 अगस्त 2023",
    category: "ज्योतिष",
    readTime: "5 मिनट"
  };

  // Related blogs data
  const relatedBlogs = [
    {
      id: 2,
      title: "कुंडली में शनि दोष और उसके निवारण",
      image: blog1,
      category: "ज्योतिष",
      date: "10 अगस्त 2023",
      readTime: "4 मिनट"
    },
    {
      id: 3,
      title: "राहु-केतु की शांति के उपाय",
      image: blog1,
      category: "ज्योतिष",
      date: "5 अगस्त 2023",
      readTime: "6 मिनट"
    },
    {
      id: 4,
      title: "वास्तु दोष दूर करने के 10 आसान तरीके",
      image: blog1,
      category: "वास्तु",
      date: "1 अगस्त 2023",
      readTime: "7 मिनट"
    }
  ];

  return (
    <div className="single-blog-page" style={{marginTop:"110px"}}>
      <div className="blog-header">
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">होम</a> &gt; 
            <a href="/blogs">ब्लॉग्स</a> &gt; 
            <a href={`/blogs/${blog.category}`}>{blog.category}</a> &gt; 
            <span>{blog.title}</span>
          </nav>
        </div>
      </div>

      <div className="container main-content">
        <article className="blog-article">
          <div className="article-header">
            <span className="category-badge">{blog.category}</span>
            <h1>{blog.title}</h1>
            <div className="author-meta">
              <div className="author-info">
                <div className="author-avatar"></div>
                <div>
                  <span className="author-name">{blog.author}</span>
                  <span className="post-date">{blog.date} · {blog.readTime} पढ़ने का समय</span>
                </div>
              </div>
              <div className="share-buttons">
                <button className="share-btn facebook"><i className="fab fa-facebook-f"></i></button>
                <button className="share-btn whatsapp"><i className="fab fa-whatsapp"></i></button>
                <button className="share-btn twitter"><i className="fab fa-twitter"></i></button>
              </div>
            </div>
          </div>

          <div className="featured-image">
            <img style={{ height:"500px"}} src={blog.image} alt={blog.title} />
          </div>

          <div className="article-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="article-footer">
            <div className="tags">
              <span>टैग्स:</span>
              <a href="#">मंगल दोष</a>
              <a href="#">ज्योतिष</a>
              <a href="#">उपाय</a>
              <a href="#">हनुमान चालीसा</a>
            </div>
            <div className="share-section">
              <h3>इस ब्लॉग को शेयर करें:</h3>
              <div className="social-share">
                <button className="share-btn facebook"><i className="fab fa-facebook-f"></i> Facebook</button>
                <button className="share-btn whatsapp"><i className="fab fa-whatsapp"></i> WhatsApp</button>
                <button className="share-btn twitter"><i className="fab fa-twitter"></i> Twitter</button>
                <button className="share-btn linkedin"><i className="fab fa-linkedin-in"></i> LinkedIn</button>
              </div>
            </div>
          </div>
        </article>

      
      </div>

      <section className="related-blogs">
        <div className="container">
          <h2>संबंधित ब्लॉग्स</h2>
          <div className="related-blogs-grid">
            {relatedBlogs.map(blog => (
              <div className="blog-card" key={blog.id}>
                <div className="card-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="category-tag">{blog.category}</span>
                </div>
                <div className="card-content">
                  <h3>{blog.title}</h3>
                  <div className="card-meta">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <a href={`/blog/${blog.id}`} className="read-more">पढ़ना जारी रखें</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="comments-section">
          <h3>टिप्पणियाँ (5)</h3>
          <div className="comment-form">
            <h4>अपनी टिप्पणी जोड़ें</h4>
            <form>
              <textarea placeholder="आपकी टिप्पणी..."></textarea>
              <div className="form-row">
                <input type="text" placeholder="आपका नाम" />
                <input type="email" placeholder="आपका ईमेल" />
              </div>
              <button type="submit">टिप्पणी सबमिट करें</button>
            </form>
          </div>
          <div className="comment-list">
            {/* Sample comments would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;