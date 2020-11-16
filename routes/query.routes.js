// данные routes будет отвечать за генерацию и сохранение запросов
const {Router} = require('express')
const Query = require('../models/Query')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/query/generate
router.post('/generate', auth, async (req, res) => {
    try {
        const {quest, title} = req.body

        const existing = await Query.findOne({ quest })

        if (existing) {
            return res.json({ query: existing })
        }

        const query = new Query({
            quest, title, owner: req.user.userId
        })

        await query.save()

        res.status(201).json({query})

    } catch (e) {
        res.status(500).json({message: 'Something wrong, Please, try again.'})
    }
})


// /api/query/get
router.get('/', auth, async (req, res) => {
    try {
        const queries = await Query.find({ owner: req.user.userId })
        res.json(queries)
    } catch (e) {
        await res.status(500).json({message: 'Something wrong, Please, try again.'})
    }
})

// /api/query/get/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
        await res.json(query)
    } catch (e) {
        await res.status(500).json({message: 'Something wrong, Please, try again.'})
    }
})

// /api/query/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const query = await Query.findOne({id: req.query.id, owner: req.user.userId})

        if (!query) {
            return res.status(400).json({message: 'Query was not found.'})
        }

        await query.remove()
        return res.json({message: 'Query was delete.'})

    } catch (e) {
        await res.status(500).json({message: 'Something wrong, Please, try again.'})
    }
})

// /api/query/edit
router.post('/edit/:id', auth, async (req, res) => {
    try {
        await Query.findByIdAndUpdate({id: req.query.id, owner: req.user.userId})
        return res.json({message: 'Query was changed.'})
    } catch (e) {
        await res.status(500).json({message: 'Something wrong, Please, try again.'})
    }
})

module.exports = router
