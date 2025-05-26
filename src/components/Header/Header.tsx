// Header.tsx
import './Header.css';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import cart from '../../assets/cart.svg';

const currencies = ['USD', 'CAD', 'EUR'];

type DropdownContent = {
  [key: string]: string[];
}

const dropdownContent: DropdownContent = {
  CURRENCY: ['OSRS', 'RS3', 'WOW'],
  ITEMS: ['Weapons', 'Armor', 'Consumables', 'Resources'],
  ACCOUNTS: ['Game Accounts', 'Premium Accounts', 'Account Services'],
  SERVICES: ['Power Leveling', 'Boosting', 'Coaching'],
  SWAP: ['Item Swap', 'Currency Swap'],
  SELL: ['Sell Items', 'Sell Currency', 'Sell Accounts']
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const handleDropdownClick = (item: string) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  return (
    <header className="header">
      <div className="left-group">
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="logo">
          <a href="https://chicksgold.com">   
            <img src='https://chicksgold.com/logo/chicks-logo-large.svg' alt="Chicks Logo" />
          </a>
        </div>

        <div className="vertical-divider"></div>

        <nav className={`navigation ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
          {['CURRENCY', 'ITEMS', 'ACCOUNTS', 'SERVICES', 'SWAP', 'SELL'].map((item) => (
            <div key={item} className="nav-item-container">
              <a 
                className={`nav-item ${activeDropdown === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick(item);
                }}
                href={`#${item.toLowerCase()}`}
              >
                {item}
                <img 
                  src='https://chicksgold.com/icons/arrow-down-nav.svg' 
                  alt="Dropdown Arrow"
                  className={activeDropdown === item ? 'rotated' : ''}
                />
              </a>
              {activeDropdown === item && (
                <div className="dropdown-menu">
                  {dropdownContent[item].map((subItem) => (
                    <a 
                      key={subItem} 
                      className="dropdown-item"
                      href={`#${subItem.toLowerCase()}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="right-group">
        <div 
          className={`nav-item ${activeDropdown === 'SITE_CURRENCY' ? 'active' : ''}`}
          onClick={() => handleDropdownClick('SITE_CURRENCY')}
        >
          {selectedCurrency}
          <img 
            src='https://chicksgold.com/icons/arrow-down-nav.svg' 
            alt="Currency Selector"
            className={activeDropdown === 'SITE_CURRENCY' ? 'rotated' : ''}
          />
          {activeDropdown === 'SITE_CURRENCY' && (
            <div className="dropdown-menu">
              {currencies.map((currency) => (
                <a 
                  key={currency}
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCurrency(currency);
                    setActiveDropdown(null);
                  }}
                >
                  {currency}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="cart">
          <img className='cart-icon' src={cart} alt="Cart" />
          Cart ({getTotalItems()})
        </div>
        <button className="sign-in-button" onClick={() => {
          window.location.href = 'https://chicksgold.com/login';
        }}>Sign In</button>
      </div>
    </header>
  );
};

export default Header;