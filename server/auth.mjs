import jwt from 'jsonwebtoken';

export const JWT_SECRET = "jwt_secret";


export const auth = (req,res,next) => {
  const token = req.headers.token;
  const isUser = jwt.verify(token,JWT_SECRET);
  
  if(isUser){
    req.userId = isUser.id;
    next();
  }else{
    res.status(401).json({
      message : "incorrect token....   Unauthorized"
    })
  }
}
