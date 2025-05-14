import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSearchbar,
  IonAvatar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  post_image_url: string;
  public_image_url?: string;
}

function SearchContainer() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("post_created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      const postsWithUrls = data.map((post) => ({
        ...post,
        public_image_url: post.post_image_url
          ? supabase.storage.from("cat-memes").getPublicUrl(post.post_image_url).data.publicUrl
          : "",
      }));

      setAllPosts(postsWithUrls);
      setFilteredPosts(postsWithUrls);
    };

    fetchPosts();
  }, []);

  const handleSearch = (event: CustomEvent) => {
    const query = (event.detail.value || "").toLowerCase();
    const filtered = allPosts.filter((post) =>
      post.post_content?.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
    setSelectedPost(null);
  };

  return (
    <div id="container">
      <IonSearchbar
        placeholder="Search posts..."
        debounce={100}
        onIonInput={handleSearch}
      ></IonSearchbar>

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>No posts found 😿</p>
      ) : (
        filteredPosts.map((post) => (
          <IonCard key={post.post_id} onClick={() => setSelectedPost(post)}>
            <IonCardHeader>{post.post_content.trim()}</IonCardHeader>
          </IonCard>
        ))
      )}

      {selectedPost && (
        <IonCard style={{ marginTop: "1rem"}}>
          <IonItem lines="none">
            <IonAvatar slot="start">
              <img src={selectedPost.avatar_url} alt="avatar" />
            </IonAvatar>
            <IonLabel>
              <h2>{selectedPost.username}</h2>
              <p>{new Date(selectedPost.post_created_at).toLocaleString()}</p>
            </IonLabel>
          </IonItem>

          <IonCardContent>
            {selectedPost.post_content.trim()}
          </IonCardContent>

          {selectedPost.public_image_url && (
            <img
              src={selectedPost.public_image_url}
              alt="Post"
              style={{ width: "250px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}
        </IonCard>
      )}
    </div>
  );
}

export default SearchContainer;