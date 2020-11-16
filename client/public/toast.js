'use strict'

var Toast = function (element, config) {
    var _this = this
    var _element = element
    var _config = {autoHide: true, delay: 3000}

    for (let props in config) {
        _config[props] = config[props]
    }

    Object.defineProperty(this, 'element', {
        get () {
            return _element
        }
    })

    Object.defineProperty(this, 'config', {
        get () {
            return _config
        }
    })

    _element.addEventListener('click', (e) => {
        if (e.target.classList.contains('toast__close')) {
            _this.hide()
        }
    })
}

Toast.prototype = {
    show () {
        var _this = this
        this.element.classList.add('toast_show')
        if (this.config.autoHide) {
            setTimeout( () => {
                _this.hide()
            }, this.config.delay)
        }
    },

    hide () {
        var event = new CustomEvent('hidden.toast', { detail: { toast: this.element } })
        this.element.classList.remove('toast_show')
        document.dispatchEvent(event)
    }
}

Toast.create = function (text, color) {
    var
        fragment = document.createDocumentFragment(),
        toast = document.createElement('div'),
        toastClose = document.createElement('button')
        toast.classList.add('toast')
        toast.style.backgroundColor = 'rgba(' + parseInt(color.substr(1, 2), 16) + ',' + parseInt(color.substr(3, 2), 16) + ',' + parseInt(color.substr(5, 2), 16) + ',1)'
        toast.innerHTML = text
        toastClose.classList.add('toast__close')
        toastClose.setAttribute('type', 'button')
        toastClose.textContent = '×'
        toast.appendChild(toastClose)
        fragment.appendChild(toast)

        return fragment
}

Toast.add = (params) => {
    var config = {
        header: 'Название заголовка',
        text: {},
        color: '#1390e5',
        autoHide: true,
        delay: 4000
    }

    if (params !== undefined) {
        for (var item in params) {
            config[item] = params[item]
        }
    }

    if (!document.querySelector('.toasts')) {
        var container = document.createElement('div')
        container.classList.add('toasts')
        container.style.cssText = 'position: fixed; top: 15px; right: 15px; width: auto;'
        document.body.appendChild(container)
    }

    document.querySelector('.toasts').appendChild(Toast.create(config.text, config.color))

    var toasts = document.querySelectorAll('.toast')
    var toast = new Toast(toasts[toasts.length - 1], { autoHide: config.autoHide, delay: config.delay })
    toast.show()

    return toast
}

document.addEventListener('hidden.toast',  (e) => {
    var element = e.detail.toast

    if (element) {
        element.parentNode.removeChild(element)
    }
})
