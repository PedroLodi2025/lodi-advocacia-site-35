// Admin panel functionality using Firestore

let db;
let currentUser = null;

// Initialize when DOM and Firebase are ready
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for Firebase to be available
    const waitForFirebase = () => {
        return new Promise((resolve) => {
            const checkFirebase = () => {
                if (window.db && window.auth) {
                    resolve();
                } else {
                    setTimeout(checkFirebase, 100);
                }
            };
            checkFirebase();
        });
    };

    await waitForFirebase();
    db = window.db;
    
    // Import Firebase Auth functions
    const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    // Monitor auth state
    onAuthStateChanged(window.auth, (user) => {
        currentUser = user;
        if (!user) {
            window.location.href = 'index.html';
            return;
        }
        
        // Update UI with user info
        const userEmailElement = document.getElementById('userEmail');
        if (userEmailElement) {
            userEmailElement.textContent = user.email;
        }
        
        // Load articles
        loadArticlesForAdmin();
    });
    
    // Setup form handlers
    setupEventHandlers();
});

// Setup event handlers
function setupEventHandlers() {
    // Add article form
    const addForm = document.getElementById('addArticleForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddArticle);
    }
    
    // Edit article form
    const editForm = document.getElementById('editArticleForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditArticle);
    }
    
    // Line counter for description
    const descriptionTextarea = document.getElementById('articleDescription');
    if (descriptionTextarea) {
        descriptionTextarea.addEventListener('input', updateLineCount);
    }
    
    const editDescriptionTextarea = document.getElementById('editArticleDescription');
    if (editDescriptionTextarea) {
        editDescriptionTextarea.addEventListener('input', updateEditLineCount);
    }
    
    // Close edit modal when clicking outside
    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                hideEditModal();
            }
        });
    }
}

// Tab functionality
function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-gray-500');
        btn.classList.remove('text-blue-600', 'border-blue-500');
    });
    
    const activeTab = document.getElementById(tabName + 'Tab');
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.classList.add('text-blue-600', 'border-blue-500');
        activeTab.classList.remove('text-gray-500');
    }
    
    // Show/hide content (for future use if more tabs are added)
}

// Load articles for admin panel
async function loadArticlesForAdmin() {
    try {
        const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const articles = [];
        querySnapshot.forEach((doc) => {
            articles.push({ id: doc.id, ...doc.data() });
        });
        
        displayArticlesForAdmin(articles);
    } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        showMessage('Erro ao carregar artigos: ' + error.message, 'error');
    }
}

// Display articles in admin panel
function displayArticlesForAdmin(articles) {
    const container = document.getElementById('articlesList');
    if (!container) return;
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <p>Nenhum artigo encontrado.</p>
                <p class="text-sm">Adicione seu primeiro artigo usando o formulário acima.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    articles.forEach((article, index) => {
        const articleElement = createAdminArticleElement(article, index);
        container.appendChild(articleElement);
    });
}

// Create article element for admin panel
function createAdminArticleElement(article, index) {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-4 rounded-lg';
    
    const formattedDate = formatDate(article.createdAt);
    const categoryClass = getCategoryClass(article.category);
    
    div.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-600">#${index + 1}</span>
                <span class="category-badge ${categoryClass}">${article.category}</span>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="editArticle('${article.id}')" 
                        class="text-blue-600 hover:text-blue-800 p-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                </button>
                <button onclick="deleteArticle('${article.id}', '${article.title.replace(/'/g, "\\'")})" 
                        class="text-red-600 hover:text-red-800 p-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <h3 class="font-semibold text-gray-900 mb-2">${article.title}</h3>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${article.description}</p>
        
        <div class="flex items-center justify-between text-xs text-gray-500">
            <span>${formattedDate}</span>
            ${article.url ? `<a href="${article.url}" target="_blank" class="text-blue-600 hover:text-blue-800">Ver artigo</a>` : '<span>Sem link</span>'}
        </div>
    `;
    
    return div;
}

// Handle add article form submission
async function handleAddArticle(e) {
    e.preventDefault();
    
    const title = document.getElementById('articleTitle').value.trim();
    const description = document.getElementById('articleDescription').value.trim();
    const category = document.getElementById('articleCategory').value;
    const url = document.getElementById('articleUrl').value.trim();
    const imageUrl = document.getElementById('articleImageUrl').value.trim();
    const buttonText = document.getElementById('articleButtonText').value.trim() || 'Saiba mais';
    
    // Validate line count
    const lineCount = description.split('\n').length;
    if (lineCount > 20) {
        showMessage('A descrição não pode ter mais de 20 linhas.', 'error', 'addArticleMessage');
        return;
    }
    
    if (!title || !description) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error', 'addArticleMessage');
        return;
    }
    
    try {
        const { collection, addDoc, getDocs, query, orderBy, limit, deleteDoc, doc: docRef } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        // Check if we have 4 articles already
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        
        // If we have 4 articles, delete the oldest one
        if (querySnapshot.size >= 4) {
            const oldestDoc = querySnapshot.docs[0];
            await deleteDoc(docRef(db, 'articles', oldestDoc.id));
            console.log('Artigo mais antigo removido para manter limite de 4');
        }
        
        // Add new article
        const articleData = {
            title,
            description,
            category,
            url: url || null,
            imageUrl: imageUrl || null,
            buttonText,
            createdAt: new Date()
        };
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Adicionando...';
        submitButton.disabled = true;
        
        await addDoc(articlesRef, articleData);
        
        showMessage('Artigo adicionado com sucesso!', 'success', 'addArticleMessage');
        
        // Clear form
        e.target.reset();
        updateLineCount(); // Reset line counter
        
        // Reload articles
        loadArticlesForAdmin();
        
    } catch (error) {
        console.error('Erro ao adicionar artigo:', error);
        showMessage('Erro ao adicionar artigo: ' + error.message, 'error', 'addArticleMessage');
    } finally {
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Adicionar Artigo';
        submitButton.disabled = false;
    }
}

// Edit article
async function editArticle(articleId) {
    try {
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const docRef = doc(db, 'articles', articleId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            showMessage('Artigo não encontrado.', 'error');
            return;
        }
        
        const article = docSnap.data();
        
        // Populate edit form
        document.getElementById('editArticleId').value = articleId;
        document.getElementById('editArticleTitle').value = article.title;
        document.getElementById('editArticleDescription').value = article.description;
        document.getElementById('editArticleCategory').value = article.category;
        document.getElementById('editArticleUrl').value = article.url || '';
        document.getElementById('editArticleImageUrl').value = article.imageUrl || '';
        document.getElementById('editArticleButtonText').value = article.buttonText || 'Saiba mais';
        
        // Update line count for edit form
        updateEditLineCount();
        
        // Show modal
        showEditModal();
        
    } catch (error) {
        console.error('Erro ao carregar artigo para edição:', error);
        showMessage('Erro ao carregar artigo: ' + error.message, 'error');
    }
}

// Handle edit article form submission
async function handleEditArticle(e) {
    e.preventDefault();
    
    const articleId = document.getElementById('editArticleId').value;
    const title = document.getElementById('editArticleTitle').value.trim();
    const description = document.getElementById('editArticleDescription').value.trim();
    const category = document.getElementById('editArticleCategory').value;
    const url = document.getElementById('editArticleUrl').value.trim();
    const imageUrl = document.getElementById('editArticleImageUrl').value.trim();
    const buttonText = document.getElementById('editArticleButtonText').value.trim() || 'Saiba mais';
    
    // Validate line count
    const lineCount = description.split('\n').length;
    if (lineCount > 20) {
        alert('A descrição não pode ter mais de 20 linhas.');
        return;
    }
    
    if (!title || !description) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    try {
        const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Salvando...';
        submitButton.disabled = true;
        
        const docRef = doc(db, 'articles', articleId);
        await updateDoc(docRef, {
            title,
            description,
            category,
            url: url || null,
            imageUrl: imageUrl || null,
            buttonText,
            updatedAt: new Date()
        });
        
        showMessage('Artigo atualizado com sucesso!', 'success');
        hideEditModal();
        loadArticlesForAdmin();
        
    } catch (error) {
        console.error('Erro ao atualizar artigo:', error);
        alert('Erro ao atualizar artigo: ' + error.message);
    } finally {
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Salvar Alterações';
        submitButton.disabled = false;
    }
}

// Delete article
async function deleteArticle(articleId, articleTitle) {
    if (!confirm(`Tem certeza que deseja excluir o artigo "${articleTitle}"?`)) {
        return;
    }
    
    try {
        const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const docRef = doc(db, 'articles', articleId);
        await deleteDoc(docRef);
        
        showMessage('Artigo excluído com sucesso!', 'success');
        loadArticlesForAdmin();
        
    } catch (error) {
        console.error('Erro ao excluir artigo:', error);
        showMessage('Erro ao excluir artigo: ' + error.message, 'error');
    }
}

// Show edit modal
function showEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show', 'flex');
    }
}

// Hide edit modal
function hideEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show', 'flex');
    }
}

// Update line count for description
function updateLineCount() {
    const textarea = document.getElementById('articleDescription');
    const counter = document.getElementById('lineCount');
    
    if (textarea && counter) {
        const lines = textarea.value.split('\n');
        const lineCount = lines.length;
        counter.textContent = lineCount;
        
        if (lineCount > 20) {
            counter.classList.add('text-red-600');
            counter.classList.remove('text-gray-500');
        } else if (lineCount > 15) {
            counter.classList.add('text-yellow-600');
            counter.classList.remove('text-gray-500', 'text-red-600');
        } else {
            counter.classList.add('text-gray-500');
            counter.classList.remove('text-yellow-600', 'text-red-600');
        }
    }
}

// Update line count for edit description
function updateEditLineCount() {
    const textarea = document.getElementById('editArticleDescription');
    const counter = document.getElementById('editLineCount');
    
    if (textarea && counter) {
        const lines = textarea.value.split('\n');
        const lineCount = lines.length;
        counter.textContent = lineCount;
        
        if (lineCount > 20) {
            counter.classList.add('text-red-600');
            counter.classList.remove('text-gray-500');
        } else if (lineCount > 15) {
            counter.classList.add('text-yellow-600');
            counter.classList.remove('text-gray-500', 'text-red-600');
        } else {
            counter.classList.add('text-gray-500');
            counter.classList.remove('text-yellow-600', 'text-red-600');
        }
    }
}

// Show message
function showMessage(message, type, elementId = null) {
    let messageElement;
    
    if (elementId) {
        messageElement = document.getElementById(elementId);
    } else {
        // Create a temporary message element
        messageElement = document.createElement('div');
        messageElement.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50';
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
    
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
    
    if (type === 'success') {
        messageElement.className = messageElement.className.replace(/bg-\w+-\d+/g, '');
        messageElement.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
    } else {
        messageElement.className = messageElement.className.replace(/bg-\w+-\d+/g, '');
        messageElement.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
    }
    
    // Hide message after 5 seconds if it has an ID
    if (elementId) {
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 5000);
    }
}

// Get CSS class for category (reuse from articles.js)
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

// Format date (reuse from articles.js)
function formatDate(timestamp) {
    if (!timestamp) return 'Data não disponível';
    
    try {
        let date;
        if (timestamp.toDate) {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }
        
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data não disponível';
    }
}