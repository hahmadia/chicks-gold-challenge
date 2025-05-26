import './Footer.css';
import visa from '../../assets/visa.svg';
import mastercard from '../../assets/mastercard.svg';
import americanExpress from '../../assets/american-express.svg';
import skrill from '../../assets/skrill.svg';
import btc from '../../assets/btc.svg';
import eth from '../../assets/eth.svg';
import ltc from '../../assets/ltc.svg';
import usdc from '../../assets/usdc.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import discord from '../../assets/discord.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="payment-methods">
        <div className="payment-icons">
          <img src={visa} alt="Visa" />
          <img src={mastercard} alt="Mastercard" />
          <img src={americanExpress} alt="American Express" />
          <img src={skrill} alt="Skrill" />
          <img src={btc} alt="Bitcoin" />
          <img src={eth} alt="Ethereum" />
          <img src={ltc} alt="Litecoin" />
          <img src={usdc} alt="USDC" />
          <span>and 50+ more</span>
        </div>
      </div>

      <div className="social-media-section">
        <div className="social-media-icons">
          <a href="https://www.facebook.com/chicksgold"><img src={facebook} alt="Facebook" /></a>
          <a href="https://www.instagram.com/chicksgold"><img src={instagram} alt="Instagram" /></a>
          <a href="https://www.twitter.com/chicksgold"><img src={twitter} alt="Twitter" /></a>
          <a href="https://www.discord.com/chicksgold"><img src={discord} alt="Discord" /></a>
        </div>
      </div>

      <div className="footer-content">

        <div className="footer-section">
          <div className="footer-logo">
              <a href="https://chicksgold.com">   
                  <img src='https://chicksgold.com/logo/chicks-logo-large.svg' alt="Chicks Logo" />
              </a>
          </div>            
          <h4>support@chicksgold.com</h4>
        </div>

        <div className="footer-section">
          <h4>Chicks Gold</h4>
          <ul>
            <li><a href="/games">Games</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/copyright-policy">Copyright Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="copyright-bar">
        <span>Copyright © 2017 - {new Date().getFullYear()} Chicksgold.com. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;