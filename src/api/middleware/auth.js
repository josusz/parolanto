import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({
            mensagem: 'Acesso negado. É obrigatório o envio do token JWT.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded.usuario; // Adiciona o usuário ao request
        next(); // Prossegue para o próximo middleware ou rota
    } catch (e) {
        res.status(403).json({ error: `Token inválido: ${e.message}` });
        console.error(e.message);
    }
}