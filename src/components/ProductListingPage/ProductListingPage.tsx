import { useState, useMemo } from 'react';
import './ProductListingPage.css';
import ProductCard from '../ProductCard/ProductCard';
import { mockProducts } from '../../api/mockData';
import { useCart } from '../../context/CartContext';
import magnifyGlass from '../../assets/magnify-glass.svg';
import sortIcon from '../../assets/sort-icon.svg';
import swordIcon from '../../assets/sword-icon.svg';
import moneyBag from '../../assets/money-bag.svg';
import leaf from '../../assets/leaf.svg';

const ITEMS_PER_PAGE = 15;

const ProductListingPage = () => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedItemType, setSelectedItemType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { addToCart } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Apply game filter
    if (selectedGame) {
      filtered = filtered.filter(product => 
        product.gameType.toLowerCase() === selectedGame.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply item type filter
    if (selectedItemType !== 'All') {
      filtered = filtered.filter(product =>
        product.itemType.toLowerCase() === selectedItemType.toLowerCase()
      );
    }

    // Apply price filter
    if (selectedPrice !== 'All') {
      filtered = filtered.filter(product => {
        const price = product.isOnSale ? product.salePrice! : product.price;
        switch (selectedPrice) {
          case 'under50':
            return price < 50;
          case '50to100':
            return price >= 50 && price <= 100;
          case 'over100':
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.isOnSale ? a.salePrice! : a.price;
          const priceB = b.isOnSale ? b.salePrice! : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.isOnSale ? a.salePrice! : a.price;
          const priceB = b.isOnSale ? b.salePrice! : b.price;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedGame, searchQuery, selectedPrice, selectedItemType, sortBy]);

  // Calculate pagination
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1]; 
    
    if (currentPage <= 3) {
      pages.push(2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="page-title">Condimentum consectetur</h1>
          
          <div className="filters-section">
            <div className="game-selector">
              <img src={swordIcon} alt="Game" />
              <select 
                value={selectedGame} 
                onChange={(e) => {
                  setSelectedGame(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Games</option>
                <option value="RS3">RuneScape 3</option>
                <option value="OSRS">Old School RuneScape</option>
                <option value="WOW">World of Warcraft</option>
              </select>
            </div>

            <div className="search-bar">
              <img src={magnifyGlass} alt="Search" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="right-filters">
              <div className="price-selector">
                <img src={moneyBag} alt="Price" />
                <select 
                  value={selectedPrice} 
                  onChange={(e) => {
                    setSelectedPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All</option>
                  <option value="under50">Under $50</option>
                  <option value="50to100">$50 - $100</option>
                  <option value="over100">Over $100</option>
                </select>
              </div>

              <div className="item-type-selector">
                <img src={leaf} alt="Item Type" />
                <select 
                  value={selectedItemType} 
                  onChange={(e) => {
                    setSelectedItemType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All</option>
                  <option value="weapon">Weapons</option>
                  <option value="armor">Armor</option>
                  <option value="consumable">Consumables</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="product-listing-container">
          <div className="results-header">
            <span className="results-count">
              Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} from {totalItems}
            </span>
            <div className="sort-by">
              <img src={sortIcon} alt="Sort" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

         {paginatedProducts.length > 0 ? <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(id, quantity) => {
                  addToCart(id, quantity);
                }} 
              />
            ))}
          </div> : <div className="no-results">😭 Sorry, no results were found. 😭</div>}

          {paginatedProducts.length > 0 && <div className="pagination">
            <button 
              className="prev-page" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <div className="page-numbers">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span style={{color: 'white'}} key={`ellipsis-${index}`}>...</span>
                ) : (
                  <button
                    key={pageNum}
                    className={currentPage === pageNum ? 'active' : ''}
                    onClick={() => setCurrentPage(Number(pageNum))}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>
            <button 
              className="next-page" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage; 