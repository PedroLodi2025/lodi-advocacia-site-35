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
    const q = query(articlesRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data()
      } as Article);
    });
    
    return articles;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
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