window.addEventListener('load', () => {
    class PlayerAudio {
        constructor(el) {
            this.el = el
            this.btn = null
            this.audio = null
            this.bar = null
            this.duration = null
            this.currentTime = null
            this.interval = null
        }

        getSecToFormat = (val) => {
            const sec = Math.round(val)
            const firstPart = (Math.floor(sec / 60)).toString().padStart(2, '0')
            const lastPart = (sec % 60).toString().padStart(2, '0')
            return `${firstPart}:${lastPart}`
        }

        changeCurrentDuration = () => {
            this.interval = setInterval(() => {
                console.log(1)
                this.currentTime.innerHTML = this.getSecToFormat(this.audio.currentTime)
            }, 1000)
        }

        play = () => {
            clearInterval(this.interval)

            setTimeout(() => {
                this.audio.dataset.currentState = 'play'
                this.audio.play()
                this.changeCurrentDuration()
            }, 0)
        }

        pause = () => {
            clearInterval(this.interval)

            setTimeout(() => {
                this.audio.dataset.currentState = 'pause'
                this.audio.pause()
            }, 0)
        }

        changeState = () => {
            const items = document.querySelectorAll('.support-audio__item')
            items.forEach(item => {
                if (item.querySelector('.support-audio__item-audio').dataset.currentState === 'play' && item !== this.el) {
                    item.querySelector('.support-audio__item-btn').click()
                }
            })

            this.btn.classList.toggle('support-audio__item-btn--pause')

            this.audio.dataset.currentState === 'pause' ?
                this.play() :
                this.pause()
        }

        updateProgress = (e) => {
            const {duration, currentTime} = e.target
            const progressInnPercents = (currentTime / duration) * 100
            this.bar.style.width = `${progressInnPercents}%`
        }

        startToWatch = () => {
            this.btn = this.el.querySelector('.support-audio__item-btn')
            this.audio = this.el.querySelector('.support-audio__item-audio')
            this.bar = this.el.querySelector('.support-audio__item-progress-bg')
            this.durarion = this.el.querySelector('.support-audio__item-duration-time')
            this.currentTime = this.el.querySelector('.support-audio__item-progress-time')

            this.durarion.innerHTML = this.getSecToFormat(this.audio.duration)

            this.btn.addEventListener('click', this.changeState)
            this.audio.addEventListener('timeupdate', this.updateProgress)
        }
    }

    class FaqAccordion {
        constructor(el) {
            this.el = el
        }

        toggleValue = () => {
            this.el.classList.toggle('support-faq__item-active')
            this.desc.style.height === '' ?
                this.desc.style.height = `${this.desc.scrollHeight}px` :
                this.desc.style.height = ''
        }

        init = () => {
            this.title = this.el.querySelector('.support-faq__item-title')
            this.desc = this.el.querySelector('.support-faq__item-desc-box')
            this.title.addEventListener('click', this.toggleValue)
        }
    }

    const objWithItems = {}
    const items = document.querySelectorAll('.support-audio__item')

    items.forEach((item, index) => {
        objWithItems[`audio${index}`] = new PlayerAudio(item)
        objWithItems[`audio${index}`].startToWatch()
    })

    const objWithFaqItems = {}
    const faqItems = document.querySelectorAll('.support-faq__item')

    faqItems.forEach((item, index) => {
        objWithFaqItems[`item${index}`] = new FaqAccordion(item)
        objWithFaqItems[`item${index}`].init()
    })
})
