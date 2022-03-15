/* eslint-disable no-unreachable */
const { constants } = require("../configs");
const { ChurchAppUsers, Post, Comment, Like } = require("../models")




/**
 * Endpoint to create a user post.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const createPost = async (params) => {
    try {
        const { bibleInfo, authId, mediaContent, postCategory, textBackground, textContent, postTitle, postDescription, fontFamily, fontSize, fontColor, postType } = params;
        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })
        // get current user location 
        const { country, state, city, _id, firstName, lastName, username, profileImageUrl } = getUserProfile
        // create user post 
        const newPost = await Post.create({
            churchAppUser: _id,
            mediaContent, postCategory, textBackground, textContent, postTitle, postDescription, fontFamily, fontSize, fontColor, postType,
            country, state, city,bibleInfo
        })


        // TODO: Other better ways to do this shaa
        const churchAppUser = { id: _id, firstName, lastName, username, profileImageUrl };
        const result = {
            id: newPost._id,
            mediaContent: newPost.mediaContent,
            postCategory: newPost.postCategory,
            textContent: newPost.textContent,
            postTitle: newPost.postTitle,
            postDescription: newPost.postDescription,
            fontFamily: newPost.fontFamily,
            fontSize: newPost.fontSize,
            fontColor: newPost.fontColor,
            postType: newPost.postType,
            country: newPost.country,
            state: newPost.state,
            city: newPost.city,
            textBackground: newPost.textBackground,
            churchAppUser: churchAppUser,
            bibleInfo: newPost.bibleInfo,
        }


        return {
            status: true,
            message: "post created successfully",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("CREATE POST ENDPOINT"),
        };
    }
}


/**
 * Endpoint to get all posts created.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getAllPosts = async (params) => {
    try {
        const { page } = params;

        const allCreatedPosts = await Post.find().populate({
            path: "churchAppUser",
            select: 'firstName lastName username'

        });

        return {
            page,
            status: true,
            message: "post retrieved successfully",
            data: allCreatedPosts
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET ALL POSTS ENDPOINTS"),
        };
    }
}



/**
 * Endpoint to create a comment.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const createComment = async (params) => {
    try {
        const { authId, postId, comment } = params;
        // check if post exist.
        const getPost = await Post.findOne({ _id: postId })
        if (!getPost) {
            return {
                status: true,
                message: "post not found",
            };
        }
        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })
        // create user comment
        const newComment = await Comment.create({
            churchAppUser: getUserProfile._id,
            post: postId,
            comment: comment
        })

        // const result =  JSON.parse(JSON.stringify(newComment));
        const { _id:id, firstName, lastName, username, profileImageUrl } = getUserProfile
        const appUser = { id, firstName, lastName, username, profileImageUrl };
        const result = {
            id: newComment._id,
            post: newComment.postId,
            comment: newComment.comment,
            timestamp: newComment.timestamp,
            churchAppUser: appUser
        }
        if (newComment) {
            await Post.updateOne(
                { _id: postId },
                {
                    $inc: { commentCount: 1 }
                }
            )
        }

        return {
            status: true,
            message: "comment created successfully",
            data: result
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("CREATE COMMENT ENDPOINT"),
        };
    }
}


/**
 * Endpoint to get all post comment .
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getAPostComments = async (params) => {
    try {
        const { page, postId } = params;

        // check if post exist.
        const getPost = await Post.findOne({ _id: postId })
        if (!getPost) {
            return {
                status: true,
                message: "post not found",
            };
        }

        const allCreatedPostComments = await Comment.find({ post: postId }).populate({
            path: "churchAppUser",
            select: '_id firstName lastName username profileImageUrl'

        });

        return {
            page,
            status: true,
            message: "comments retrieved successfully",
            data: allCreatedPostComments
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET A POST COMMENTS ENDPOINTS"),
        };
    }
}


/**
 * Endpoint to like a post.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const postLike = async (params) => {
    try {
        const { authId, postId } = params;
        // check if post exist.
        const getPost = await Post.findOne({ _id: postId })
        if (!getPost) {
            return {
                status: true,
                message: "post not found",
            };
        }
        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })
        // create user like
        const newLike = await Like.create({
            churchAppUser: getUserProfile._id,
            post: postId,
        })

        if (newLike) {
            await Post.updateOne(
                { _id: postId },
                {
                    $inc: { likeCount: 1 }
                }
            )
        }

        return {
            status: true,
            message: "post liked successfully",
            data: newLike
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("CREATE COMMENT ENDPOINT"),
        };
    }
}


/**
 * Endpoint to unlike a post.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const postUnLike = async (params) => {
    try {
        const { authId, postId } = params;
        // check if post exist.
        const getPost = await Post.findOne({ _id: postId })
        if (!getPost) {
            return {
                status: true,
                message: "post not found",
            };
        }
        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })
        // create user like

        const userDeleted = await Like.deleteOne({ churchAppUser: getUserProfile._id, post: postId, });


        if (userDeleted) {
            if (getUserProfile.likeCount > 0) {
                await Post.updateOne(
                    { _id: postId },
                    {
                        $inc: { likeCount: -1 }
                    }
                )
            }

        }

        return {
            status: true,
            message: "post unliked successfully",
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("CREATE COMMENT ENDPOINT"),
        };
    }
}


/**
 * Endpoint to get all post comment .
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getAPostLikes = async (params) => {
    try {
        const { page, postId } = params;

        const allPostLikes = await Like.find({ post: postId }).populate({
            path: "churchAppUser",
            select: '_id firstName lastName username profileImageUrl'
        });

        return {
            page,
            status: true,
            message: "likes retrieved successfully",
            data: allPostLikes
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET A POST LIKES ENDPOINTS"),
        };
    }
}

/**
 * Endpoint to get all user commented posts.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getAllUserCommentedPosts = async (params) => {
    try {
        const { authId, page } = params;

        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })

        const allUserCommentedPosts = await Comment.find({ churchAppUser: getUserProfile._id }).populate({ path: "post" });

        return {
            page,
            status: true,
            message: "posts retrieved successfully",
            data: allUserCommentedPosts
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET ALL USER COMMENTED POSTS"),
        };
    }
}

/**
 * Endpoint to get all user liked posts.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getAllUsersLikedPosts = async (params) => {
    try {
        const { authId, page } = params;

        const getUserProfile = await ChurchAppUsers.findOne({ _id: authId })

        const allUserLikedPosts = await Like.find({ churchAppUser: getUserProfile._id }).populate({ path: "post" });

        return {
            page,
            status: true,
            message: "posts retrieved successfully",
            data: allUserLikedPosts
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET ALL USER LIKED POSTS"),
        };
    }
}


/**
 * Endpoint to get user post feeds.
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */

const getUserPostFeeds = async (params) => {
    try {
        const { page, authId } = params;
        //const getUserProfile = await ChurchAppUsers.findOne({ personalAuthId: id });

        // get all folowers Ids  


        // get all following Ids  

        // get profile suggestions Ids 

        // Merge Array of Ids       

        //find all posts whose user Id is in the merged array.

        // get all post likes

        const userPostFeeds = await Post.find().populate({
            path: "churchAppUser",
            select: '_id firstName lastName username profileImageUrl'

        });

        const likedPostFeeds = await Like.find({ churchAppUser: authId });
        const likedPostFeedsForMap = JSON.parse(JSON.stringify(likedPostFeeds));
        const arrayOfLikePostsId = likedPostFeedsForMap.map(eachLike => eachLike.post)
        const docForMap = JSON.parse(JSON.stringify(userPostFeeds));
        const result = []


        docForMap.map(element => {
            const postId = element._id;
            if (!arrayOfLikePostsId.includes(postId)) {
                element.hasLiked = false;
            } else {
                element.hasLiked = true;
            }
            return result.push(element)

        });
        return {
            page,
            status: true,
            message: "posts feeds retrieved successfully",
            data: result
        };


    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("GET ALL USER POST FEEDS"),
        };
    }
}




module.exports = {
    createPost,
    getAllPosts,
    createComment,
    getAPostComments,
    postLike,
    postUnLike,
    getAPostLikes,
    getAllUserCommentedPosts,
    getAllUsersLikedPosts,
    getUserPostFeeds
}