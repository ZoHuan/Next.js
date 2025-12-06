import { supabase } from "./supabase";

// 认证相关操作
export const authApi = {
  supabase,

  // 生成默认头像URL
  generateDefaultAvatar(username: string): string {
    const uiAvatars = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=3b82f6&color=fff`;

    return uiAvatars;
  },

  // 用户注册
  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) throw error;

    // 如果注册成功且用户已确认，创建profiles记录
    if (data.user) {
      try {
        const defaultAvatar = this.generateDefaultAvatar(username);

        await supabase.from("profiles").insert({
          id: data.user.id,
          username: username,
          avatar_url: defaultAvatar,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } catch (profileError) {
        console.warn("创建profiles记录失败:", profileError);
      }
    }

    return data;
  },

  // 用户登录
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // 用户登出
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 获取当前用户（包含profile信息）
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;

    if (!user) return null;

    // 同时获取profile信息
    try {
      const { data: profile } = await supabase.from("profiles").select("username, avatar_url").eq("id", user.id).single();

      return {
        ...user,
        profile,
      };
    } catch (_profileError) {
      // 如果profile不存在，只返回user信息
      return user;
    }
  },

  // 获取会话信息
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },
};

// 文章相关操作
export const articleApi = {
  // 获取所有文章（支持分页和过滤）
  async getArticles(options?: { page?: number; pageSize?: number; status?: "published" | "draft" | "all"; searchTerm?: string }) {
    const { page = 1, pageSize = 10, status = "published", searchTerm = "" } = options || {};
    const startIndex = (page - 1) * pageSize;

    let query = supabase
      .from("articles")
      .select(
        `
        *,
        profiles:author_id(username, avatar_url)  
      `
      )
      .order("created_at", { ascending: false });

    // 状态过滤
    if (status !== "all") {
      query = query.eq("status", status);
    }

    // 搜索过滤
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
    }

    const { data, error, count } = await query.range(startIndex, startIndex + pageSize - 1);

    if (error) throw error;

    return {
      articles:
        data?.map((article) => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          content: article.content,
          description: article.description,
          imageUrl: article.image_url,
          tags: article.tags || [],
          author: {
            name: article.profiles?.username || "Unknown",
            avatar: article.profiles?.avatar_url || "",
          },
          createdAt: article.created_at,
          status: article.status,
        })) || [],
      totalCount: count || 0,
    };
  },

  async getArticleById(id: string) {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        *,
        profiles:author_id(username, avatar_url)  
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return data
      ? {
          id: data.id,
          slug: data.slug,
          title: data.title,
          content: data.content,
          description: data.description,
          imageUrl: data.image_url,
          tags: data.tags || [],
          author: {
            name: data.profiles?.username || "Unknown",
            avatar: data.profiles?.avatar_url || "",
          },
          createdAt: data.created_at,
          status: data.status,
        }
      : null;
  },

  // 根据slug获取单篇文章
  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        *,
        profiles:author_id(username, full_name, avatar_url)
      `
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) throw error;

    return data
      ? {
          id: data.id,
          slug: data.slug,
          title: data.title,
          content: data.content,
          description: data.description,
          imageUrl: data.image_url,
          tags: data.tags || [],
          author: {
            name: data.profiles?.full_name || "Unknown",
            avatar: data.profiles?.avatar_url || "",
          },
          createdAt: data.created_at,
        }
      : null;
  },

  // 创建文章
  async createArticle(articleData: {
    title: string;
    slug: string;
    content: string;
    description: string;
    imageUrl?: string;
    tags: string[];
    status?: "draft" | "published";
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("用户未登录");

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: articleData.title,
        slug: articleData.slug,
        content: articleData.content,
        description: articleData.description,
        image_url: articleData.imageUrl,
        tags: articleData.tags,
        status: articleData.status || "draft",
        author_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 更新文章
  async updateArticle(
    id: string,
    articleData: {
      title?: string;
      slug?: string;
      content?: string;
      description?: string;
      imageUrl?: string;
      tags?: string[];
      status?: "draft" | "published";
    }
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("用户未登录");

    const { data, error } = await supabase
      .from("articles")
      .update({
        ...articleData,
        image_url: articleData.imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("author_id", user.id) // 只能更新自己的文章
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 删除文章
  async deleteArticle(id: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("用户未登录");

    const { error } = await supabase.from("articles").delete().eq("id", id).eq("author_id", user.id); // 只能删除自己的文章

    if (error) throw error;
  },
};

// 评论相关操作
export const commentApi = {
  // 获取文章评论
  async getComments(articleId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        *,
        profiles:author_id(username, avatar_url) 
      `
      )
      .eq("article_id", articleId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    const buildCommentTree = (comments: any[]): any[] => {
      const commentMap = new Map();
      const rootComments: any[] = [];

      comments.forEach((comment) => {
        commentMap.set(comment.id, {
          id: comment.id,
          content: comment.content,
          author: {
            name: comment.profiles?.username || "Unknown",
            avatar: comment.profiles?.avatar_url || "",
          },
          createdAt: comment.created_at,
          replies: [],
        });
      });

      comments.forEach((comment) => {
        const commentNode = commentMap.get(comment.id);
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) parent.replies.push(commentNode);
        } else {
          rootComments.push(commentNode);
        }
      });

      return rootComments;
    };

    return buildCommentTree(data || []);
  },

  // 创建评论
  async createComment(commentData: { articleId: string; content: string; parentId?: string }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("用户未登录");

    const { data, error } = await supabase
      .from("comments")
      .insert({
        content: commentData.content,
        article_id: commentData.articleId,
        parent_id: commentData.parentId,
        author_id: user.id,
      })
      .select(
        `
        *,
        profiles:author_id(username, full_name, avatar_url)
      `
      )
      .single();

    if (error) throw error;

    return {
      id: data.id,
      content: data.content,
      author: {
        name: data.profiles?.full_name || "Unknown",
        avatar: data.profiles?.avatar_url || "",
      },
      createdAt: data.created_at,
      replies: [],
    };
  },
};
