/* eslint-disable default-case */

const express = require('express');
const bodyParser = require('body-parser');
const { User, Tasks } = require('./sequelize');
const cors = require('cors');
const app = express();

// const ModelTask = require('./models/tasks')
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})
//create a user
app.post('/api/user', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
});

//get all users
app.get('/api/user', (req, res) => {
    User.findAll().then(users => res.json(users))
});

//creat a task
app.post('/api/task/', async (req, res) => {
    try {
        const task = await Tasks.create(req.body);
        res.json(task);
    } catch (err) {
        console.log(err);
    }
});
//update a task
app.patch('/api/task/', async (req, res) => {
    try {

        const cur = await Tasks.findByPk(req.body.id);
        const complete = await cur.update(req.body);

        res.json(complete);
    } catch (err) {
        console.log(err);
    }
});
//delete a task
app.delete('/api/task/:id', async (req, res) => {
    try {
        const cur = await Tasks.findByPk(req.params.id);
        await cur.destroy();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
});

app.delete('/api/clear/', async (req, res) => {
    try {
        const usertasks = await Tasks.destroy({ where: { status: true }, order: [['id', 'ASC'],] })
        res.json(usertasks);
    } catch (err) {
        console.log(err);
    }
});
//toggle
app.patch('/api/toggle/', async (req, res) => {
    try {
        const chng = await Tasks.update({ status: req.query.selectAll }, { where: { user_id: req.query.id } });
        res.json(chng);
    } catch (err) {
        console.log(err);
    }
})
//edit task
app.patch('/api/edit/', async (req, res) => {
    try {
        const editTask = await Tasks.update({ text: req.body.text }, { where: { id: req.query.id } });
        res.json(editTask);
    } catch (err) {
        console.log(err);
    }
})
//filter
app.get('/api/filter/', async (req, res) => {
    try {
        const left = await Tasks.findAll({ where: { status: false } });
        let tasks = [];

        switch (req.query.filterMode) {
            case 'all':
                tasks = await Tasks.findAll({ where: { user_id: req.query.userId }, order: [['id', 'ASC'],] });
                break;
            case 'active':
                tasks = await Tasks.findAll({ where: { user_id: req.query.userId, status: false }, order: [['id', 'ASC'],] })
                break;
            case 'completed':
                tasks = await Tasks.findAll({ where: { user_id: req.query.userId, status: true }, order: [['id', 'ASC'],] })
                break;
            default:
                break;

        }

        res.json({ tasks, count: left.length });
    } catch (err) {
        console.log(err);
    }
})

  // switch (req.query.filterMode) {
        //     case 'all':
        //         const usertasks = 
        //         const left = await Tasks.findAll({ where: { status: false } });
        //         res.json({ usertasks, count: left.length });
        //         break;
        //     case 'active':
        //         const activetasks = await Tasks.findAll({ where: { user_id: req.query.userId, status: false }, order: [['id', 'ASC'],] })
        //         res.json({ activetasks, count: left.length });
        //         break;
        //     case 'completed':
        //         const completetast = await Tasks.findAll({ where: { user_id: req.query.userId, status: true }, order: [['id', 'ASC'],] })
        //         res.json({ completetast, count: left.length });
        //         break;
        //     default:
        //         res.sendStatus(404);
        //         break;
        // };