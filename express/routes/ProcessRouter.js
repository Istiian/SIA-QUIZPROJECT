// routes/ProcessRouter.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const Password = req.body.Password;
    const Username = req.body.Username;
    const CreateUsername = req.body.CreateUsername;
    const CreateConfirmPassword = req.body.CreateConfirmPassword;
    const CreatePassword = req.body.CreatePassword;
    const Process = req.body.Process;

    console.log(Process);
});

module.exports = router;
