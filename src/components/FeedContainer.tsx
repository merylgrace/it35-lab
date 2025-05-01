import { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
  IonInput, IonLabel, IonModal, IonFooter, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonAlert, IonText,
  IonAvatar, IonCol, IonGrid, IonRow, IonIcon, IonPopover
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  post_image_url: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
          setAvatarUrl(userData.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg');
        }
      }
    };

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('post_created_at', { ascending: false });
      if (!error && data) {
        setPosts(data as Post[]);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const createPost = async () => {
    console.log("createPost fired");

    if (!postContent) {
      console.log("No post content");
      return;
    }

    if (!user) {
      console.log("No user");
      return;
    }

    if (!username) {
      console.log("No username");
      return;
    }

    let imagePath = '';
    if (imageFile) {
      console.log("Uploading image...");
      const { data, error } = await supabase.storage
        .from('cat-memes')
        .upload(`public/${Date.now()}_${imageFile.name}`, imageFile);

      if (error) {
        console.error('Error uploading image:', error.message);
        return;
      }

      console.log("Image uploaded:", data);
      imagePath = data?.path || '';
    }

    console.log("Inserting post...");
    const { data: postData, error: insertError } = await supabase
      .from('posts')
      .insert([{
        post_content: postContent,
        user_id: user.id,
        username,
        avatar_url: avatarUrl,
        post_image_url: imagePath
      }])
      .select('*');

    if (insertError) {
      console.error('Error creating post:', insertError.message);
      return;
    }

    if (postData && postData[0]) {
      setPosts([postData[0] as Post, ...posts]);
      setPostContent('');
      setImageFile(null);
      setImageUrl('');
    }
  };


  const deletePost = async (post_id: string) => {
    const { error } = await supabase.from('posts').delete().match({ post_id });
    if (error) {
      console.error('Error deleting post:', error);
      return;
    }
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) {
      console.error('Missing content or selected post!');
      return;
    }
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .eq('post_id', editingPost.post_id)
      .select('*');
    if (error) {
      console.error('Error updating post:', error);
      return;
    }
    if (data && data[0]) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(p => (p.post_id === updatedPost.post_id ? updatedPost : p)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <IonContent>
      {user ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Create Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput
                value={postContent}
                onIonChange={e => setPostContent(e.detail.value!)}
                placeholder="Write a post..."
              />
              <input type="file" onChange={handleImageChange} />
              {imageFile && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }}
                />
              )}
              <IonButton expand="block" onClick={() => createPost()} style={{ marginTop: '1rem' }}>
                Post
              </IonButton>
            </IonCardContent>
          </IonCard>

          {posts.map(post => (
            <IonCard key={post.post_id}>
              <IonCardHeader>
                <IonRow>
                  <IonCol size="auto">
                    <IonAvatar>
                      <img alt={post.username} src={post.avatar_url} />
                    </IonAvatar>
                  </IonCol>
                  <IonCol>
                    <IonCardTitle>{post.username}</IonCardTitle>
                    <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton
                      fill="clear"
                      onClick={(e) =>
                        setPopoverState({
                          open: true,
                          event: e.nativeEvent,
                          postId: post.post_id,
                        })
                      }
                    >
                      <IonIcon icon={pencil} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
              <IonCardContent>
                <p>{post.post_content}</p>
                {post.post_image_url && (
                  <img
                    src={supabase.storage.from('cat-memes').getPublicUrl(post.post_image_url).data.publicUrl}
                    alt="Post"
                    style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }}
                  />
                )}

              </IonCardContent>
              <IonPopover
                isOpen={popoverState.open && popoverState.postId === post.post_id}
                event={popoverState.event}
                onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
              >
                <IonButton fill="clear" onClick={() => { startEditingPost(post); setPopoverState({ open: false, event: null, postId: null }); }}>
                  Edit
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>
                  Delete
                </IonButton>
              </IonPopover>
            </IonCard>
          ))}

          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit Post</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonInput
                value={postContent}
                onIonChange={e => setPostContent(e.detail.value!)}
                placeholder="Edit your post..."
              />
            </IonContent>
            <IonFooter>
              <IonButton onClick={savePost}>Save</IonButton>
              <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
            </IonFooter>
          </IonModal>

          <IonAlert
            isOpen={isAlertOpen}
            onDidDismiss={() => setIsAlertOpen(false)}
            header="Success"
            message="Post updated successfully!"
            buttons={['OK']}
          />
        </>
      ) : (
        <IonLabel>Loading user...</IonLabel>
      )}
    </IonContent>
  );
};

export default FeedContainer;