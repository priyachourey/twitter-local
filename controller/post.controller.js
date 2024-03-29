const postService = require("../service/post.service")
const router  = require("express").Router()
const logger = require('../utils/logger')

router.use((req,res,next) => {
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        if(userinfo){
              // Log an info message for each incoming request
            logger.info(`Received a request for ${req.url} from ${userinfo.username}`);
            next();
        }else{
            res.status(401).send()
        }
    }catch(err){
        res.status(401).send()
    }

})

router.post("/create",(req,res)=>{
    try{
        let postdata = req.body
        postService.createpost(postdata)
        res.send("post created")
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
    
})

router.delete("/delete/:postid",(req,res)=>{
    try{
        let postid = req.params.postid
        postService.removePost(postid)
        res.send("post removed")
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/list/:username", async(req,res) => {
    try{
        let username = req.params.username
        let posts = await postService.getPostList(username)
        res.send(posts)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/:postid", async(req,res) => {
    try{
        let postid = req.params.postid
        let posts = await postService.getPostById(postid)
        res.send(posts)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }

})

module.exports = router

