    const router = require('express').Router();

    router.use(require('./routes/login.route'));
    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
          res.status(401).json({ errors:  [{location: req.path, msg: 'Not authorized', param: null}]})
        }
        next(err);
      });

    router.get('/', (req, res) => {
        res.status(200).json({msg: "server up and running"});
    });
      //após tentar casar todas as rotas a ultima rota que sobrou é not found
    router.get('*', (req, res) => {
        res.status(404).json({ errors:  [{location: req.path, msg: 'Could not do login', param: null}]});
    });

    module.exports = router;