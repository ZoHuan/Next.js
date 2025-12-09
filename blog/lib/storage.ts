import { supabase } from "./supabase";

export const storageApi = {
  // 验证存储桶是否存在
  async checkBucketExists(bucketName: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.storage.getBucket(bucketName);
      if (error) {
        if (error.message.includes("not found")) {
          return false;
        }
        throw error;
      }
      return true;
    } catch (error) {
      console.error("检查存储桶失败:", error);
      return false;
    }
  },

  // 获取存储桶信息
  async getBucketInfo(bucketName: string) {
    const { data, error } = await supabase.storage.getBucket(bucketName);
    if (error) throw error;
    return data;
  },

  // 删除图片
  async deleteImage(filePath: string, bucketName: string = "article-images") {
    const { data, error } = await supabase.storage.from(bucketName).remove([filePath]);
    if (error) throw error;
    return data;
  },

  // 获取图片列表
  async listImages(bucketName: string = "article-images", limit: number = 100) {
    const { data, error } = await supabase.storage.from(bucketName).list("", {
      limit,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) throw error;
    return data;
  },
};
