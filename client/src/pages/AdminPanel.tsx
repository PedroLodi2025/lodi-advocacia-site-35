import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Plus, Edit, Trash2, Users, FileText, LogOut, Upload } from 'lucide-react';
import type { Article } from '@shared/schema';

interface Profile {
  id: string;
  username: string;
  role: string;
  created_at: string;
}

const AdminPanel = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    category: 'Direito Civil',
    button_text: 'Saiba mais',
    url: ''
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    'Direito Civil',
    'Direito Bancário', 
    'Direito do Trabalho',
    'Direito de Família',
    'Direito do Consumidor',
    'Direito Empresarial'
  ];

  // Load articles and profiles
  useEffect(() => {
    loadArticles();
    loadProfiles();
  }, []);

  const loadArticles = async () => {
    setIsLoadingData(true);
    try {
      const articles = await apiRequest('/api/articles');
      setArticles(articles);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar artigos",
        variant: "destructive"
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadProfiles = async () => {
    try {
      const users = await apiRequest('/api/users');
      setProfiles(users);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários",
        variant: "destructive"
      });
    }
  };

  // Function to resize image before upload
  const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 600, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Resize image for optimal web display
        const resizedFile = await resizeImage(file, 800, 600, 0.8);
        setSelectedImage(resizedFile);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Erro",
          description: "Erro ao processar a imagem",
          variant: "destructive"
        });
      }
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', newArticle.title);
      formData.append('description', newArticle.description);
      formData.append('category', newArticle.category);
      formData.append('button_text', newArticle.button_text);
      formData.append('url', newArticle.url);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await apiRequest('/api/articles', {
        method: 'POST',
        body: formData,
      });

      toast({
        title: "Sucesso",
        description: "Artigo criado com sucesso!"
      });
      
      setNewArticle({
        title: '',
        description: '',
        category: 'Direito Civil',
        button_text: 'Saiba mais',
        url: ''
      });
      
      setSelectedImage(null);
      setImagePreview(null);
      
      loadArticles();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar artigo",
        variant: "destructive"
      });
    }
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      await apiRequest(`/api/articles/${editingArticle.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editingArticle.title,
          description: editingArticle.description,
          category: editingArticle.category,
          button_text: editingArticle.button_text,
          url: editingArticle.url
        }),
      });

      toast({
        title: "Sucesso",
        description: "Artigo atualizado com sucesso!"
      });
      setEditingArticle(null);
      loadArticles();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar artigo",
        variant: "destructive"
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;

    try {
      await apiRequest(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      toast({
        title: "Sucesso",
        description: "Artigo excluído com sucesso!"
      });
      loadArticles();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir artigo",
        variant: "destructive"
      });
    }
  };

  const categoryColors: Record<string, string> = {
    'Direito Civil': 'bg-blue-100 text-blue-800',
    'Direito Bancário': 'bg-green-100 text-green-800',
    'Direito do Trabalho': 'bg-yellow-100 text-yellow-800',
    'Direito de Família': 'bg-purple-100 text-purple-800',
    'Direito do Consumidor': 'bg-red-100 text-red-800',
    'Direito Empresarial': 'bg-gray-100 text-gray-800'
  };

  // Handle authentication state without early returns
  if (!loading && !user) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-muted-foreground">Lodi Advocacia</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Gerenciar Artigos</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Gerenciar Usuários</span>
            </TabsTrigger>
          </TabsList>

          {/* Articles Management */}
          <TabsContent value="articles" className="space-y-6">
            {/* Create Article Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Criar Novo Artigo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <select
                        id="category"
                        value={newArticle.category}
                        onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={newArticle.description}
                      onChange={(e) => setNewArticle({...newArticle, description: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="button_text">Texto do Botão</Label>
                      <Input
                        id="button_text"
                        value={newArticle.button_text}
                        onChange={(e) => setNewArticle({...newArticle, button_text: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL (opcional)</Label>
                      <Input
                        id="url"
                        type="url"
                        value={newArticle.url}
                        onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Imagem do Artigo (opcional)</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-xs max-h-48 rounded-lg border border-border object-cover"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                        >
                          Remover Imagem
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Criar Artigo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Articles List */}
            <Card>
              <CardHeader>
                <CardTitle>Artigos Publicados</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p>Carregando artigos...</p>
                  </div>
                ) : articles.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum artigo encontrado. Crie o primeiro artigo!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="border border-border rounded-lg p-4">
                        {editingArticle?.id === article.id ? (
                          <form onSubmit={handleUpdateArticle} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Título</Label>
                                <Input
                                  value={editingArticle.title}
                                  onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Categoria</Label>
                                <select
                                  value={editingArticle.category}
                                  onChange={(e) => setEditingArticle({...editingArticle, category: e.target.value})}
                                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                  required
                                >
                                  {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Descrição</Label>
                              <Textarea
                                value={editingArticle.description}
                                onChange={(e) => setEditingArticle({...editingArticle, description: e.target.value})}
                                rows={3}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Texto do Botão</Label>
                                <Input
                                  value={editingArticle.button_text || ''}
                                  onChange={(e) => setEditingArticle({...editingArticle, button_text: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>URL (opcional)</Label>
                                <Input
                                  type="url"
                                  value={editingArticle.url || ''}
                                  onChange={(e) => setEditingArticle({...editingArticle, url: e.target.value})}
                                  placeholder="https://..."
                                />
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button type="submit" size="sm">Salvar</Button>
                              <Button type="button" variant="outline" size="sm" onClick={() => setEditingArticle(null)}>
                                Cancelar
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{article.title}</h3>
                                <Badge className={`mt-1 ${categoryColors[article.category] || 'bg-gray-100 text-gray-800'}`}>
                                  {article.category}
                                </Badge>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingArticle(article)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteArticle(article.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2">{article.description}</p>
                            {article.image_url && (
                              <div className="mb-3">
                                <img 
                                  src={article.image_url} 
                                  alt={article.title}
                                  className="max-w-xs max-h-32 rounded-lg border border-border object-cover"
                                />
                              </div>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Data: {new Date(article.date).toLocaleDateString('pt-BR')}</span>
                              <span>Botão: "{article.button_text}"</span>
                              {article.url && (
                                <a 
                                  href={article.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  Ver URL
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                {profiles.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum usuário encontrado.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {profiles.map((profile) => (
                      <div key={profile.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{profile.username}</h3>
                            <p className="text-sm text-muted-foreground">
                              Cadastrado em: {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                            {profile.role}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;