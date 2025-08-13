import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Article {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  button_text: string;
  url?: string;
  image_url?: string;
  created_at?: any;
  updated_at?: any;
}

export interface CreateArticle {
  user_id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  button_text: string;
  url?: string;
  image_url?: string;
}

// Get all articles
export const getArticles = async (): Promise<Article[]> => {
  try {
    const articlesRef = collection(db, 'articles');
    let q;
    try {
      q = query(articlesRef, orderBy('created_at', 'desc'));
    } catch (orderError) {
      // If ordering fails, just get all articles without ordering
      q = query(articlesRef);
    }
    
    const querySnapshot = await getDocs(q);
    
    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        user_id: data.user_id || '',
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        date: data.date || new Date().toISOString().split('T')[0],
        button_text: data.button_text || 'Saiba mais',
        url: data.url || '',
        image_url: data.image_url || '',
        created_at: data.created_at,
        updated_at: data.updated_at
      } as Article);
    });
    
    // Sort by created_at if available, otherwise by date
    articles.sort((a, b) => {
      const dateA = a.created_at?.seconds || new Date(a.date).getTime() / 1000;
      const dateB = b.created_at?.seconds || new Date(b.date).getTime() / 1000;
      return dateB - dateA;
    });
    
    return articles;
  } catch (error) {
    console.error('Error getting articles:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};

// Get single article
export const getArticle = async (id: string): Promise<Article | null> => {
  try {
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Article;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting article:', error);
    throw error;
  }
};

// Create article
export const createArticle = async (article: CreateArticle): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...article,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id: string, updates: Partial<CreateArticle>): Promise<void> => {
  try {
    const docRef = doc(db, 'articles', id);
    await updateDoc(docRef, {
      ...updates,
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'articles', id));
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};