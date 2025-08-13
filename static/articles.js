// Articles management using Firestore

let db;

// Initialize Firestore when available
document.addEventListener('DOMContentLoaded', async () => {
    const waitForFirestore = () => {
        return new Promise((resolve) => {
            const checkFirestore = () => {
                if (window.db) {
                    resolve();
                } else {
                    setTimeout(checkFirestore, 100);
                }
            };
            checkFirestore();
        });
    };

    await waitForFirestore();
    db = window.db;
    
    // Load articles on main page
    if (!window.location.pathname.includes('admin.html')) {
        loadArticlesForDisplay();
    }
});

// Load articles for display on main page
async function loadArticlesForDisplay() {
    try {
        const { collection, getDocs, query, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(4));
        const querySnapshot = await getDocs(q);
        
        const articles = [];
        querySnapshot.forEach((doc) => {
            articles.push({ id: doc.id, ...doc.data() });
        });
        
        displayArticles(articles);
    } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        // Show fallback articles if Firebase fails
        displayFallbackArticles();
    }
}

// Display articles on the main page
function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    if (articles.length === 0) {
        displayFallbackArticles();
        return;
    }
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        container.appendChild(articleCard);
    });
}

// Create article card element
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300';
    
    const categoryClass = getCategoryClass(article.category);
    const formattedDate = formatDate(article.createdAt);
    
    card.innerHTML = `
        ${article.imageUrl ? `
            <div class="h-48 bg-gray-200 overflow-hidden">
                <img src="${article.imageUrl}" alt="${article.title}" 
                     class="w-full h-full object-cover" 
                     onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400\\'>Imagem não disponível</div>'">
            </div>
        ` : ''}
        
        <div class="p-6">
            <div class="flex items-center justify-between mb-3">
                <span class="category-badge ${categoryClass}">${article.category}</span>
                <div class="text-xs text-gray-500">
                    ${formattedDate}
                </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                ${article.title}
            </h3>
            
            <p class="text-gray-600 mb-4 line-clamp-3">
                ${article.description}
            </p>
            
            ${article.url ? `
                <a href="${article.url}" target="_blank" 
                   class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    ${article.buttonText || 'Saiba mais'}
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Get CSS class for category
function getCategoryClass(category) {
    const categoryMap = {
        'Direito Civil': 'category-civil',
        'Direito Bancário': 'category-bancario',
        'Direito do Trabalho': 'category-trabalho',
        'Direito de Família': 'category-familia',
        'Direito do Consumidor': 'category-consumidor',
        'Direito Empresarial': 'category-empresarial'
    };
    return categoryMap[category] || 'category-civil';
}

// Format date for display
function formatDate(timestamp) {
    if (!timestamp) return 'Data não disponível';
    
    try {
        let date;
        if (timestamp.toDate) {
            // Firestore Timestamp
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }
        
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data não disponível';
    }
}

// Display fallback articles when Firebase is not available
function displayFallbackArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    const fallbackArticles = [
        {
            title: "Penhora Ilegal de Conta Bancária",
            description: "Saiba como identificar bloqueios indevidos de valores e como agir juridicamente para recuperar seus recursos.",
            buttonText: "Saiba mais",
            url: "https://bancos.lodiadvocacia.com.br",
            category: "Direito Bancário",
            createdAt: new Date('2024-12-01')
        },
        {
            title: "Assédio Moral no Ambiente de Trabalho",
            description: "Conheça seus direitos diante de situações abusivas no ambiente profissional e como buscar reparação.",
            buttonText: "Entenda seus direitos",
            url: "https://trabalhista.lodiadvocacia.com.br",
            category: "Direito do Trabalho",
            createdAt: new Date('2024-11-01')
        },
        {
            title: "BPC Loas para Crianças Autistas",
            description: "Entenda os requisitos e possibilidades legais para acessar o Benefício de Prestação Continuada.",
            buttonText: "Saiba como solicitar",
            url: "https://familia.lodiadvocacia.com.br",
            category: "Direito de Família",
            createdAt: new Date('2024-10-01')
        },
        {
            title: "Revisão de Contratos de Financiamento",
            description: "Saiba como revisar cláusulas abusivas e buscar equilíbrio contratual em financiamentos bancários.",
            buttonText: "Reveja seu contrato",
            url: "https://consumidor.lodiadvocacia.com.br",
            category: "Direito do Consumidor",
            createdAt: new Date('2024-09-01')
        }
    ];
    
    displayArticles(fallbackArticles);
}

// Add CSS for line clamping
const style = document.createElement('style');
style.textContent = `
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);