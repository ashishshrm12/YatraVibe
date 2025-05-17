import jwt from 'jsonwebtoken';

// Basic token verification
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded: { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Allow only users with role "admin"
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Admin access denied' });
    }
  });
};

// Allow only users with role "user"
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'user') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'User access denied' });
    }
  });
};
