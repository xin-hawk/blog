import request from "./request";

/**
 * 获取博客列表数量
 * @param {当前页码} page 
 * @param {页容量} limit 
 * @param {所属分类} categoryid 
 * @param {查找关键字} keyword 
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1, keyword = '') {
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid,
            keyword
        }
    })
}

/**
 * 获取博客分类
 */
export async function getBlogTypes() {
    return await request.get("/api/blogtype")
}

/**
 * 获取单个博客
 * @param {*} id 
 * @returns 
 */
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

/**
 * 提交评论
 * @param {*} commentIofo 
 * @returns 
 */
export async function postComment(commentIofo) {
    return await request.post("/api/comment", commentIofo)
}

/**
 * 分页获取评论
 * @param {*} blogid 
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
export async function getComment(blogid, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogid,
            page,
            limit
        }
    })
}