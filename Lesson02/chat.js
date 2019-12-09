//Хочу сделать чат, как отдельно подключаемый файл к любой странице,
//поэтому не использую html и css
//к следующему уроку доделаю, нет времени
class Chat {
    constructor() {
        const chatEl = this.createEl("div");
        console.dir(chatEl);
        this.render(chatEl);
    }
    createEl = el => {
        const chatEl = document.createElement(el);
        chatEl.classList.add("chat");
        const elStyle = chatEl.style;
        elStyle.width = "300px";
        elStyle.height = "350px";
        elStyle.backgroundColor = "black";
        elStyle.position = "absolute";
        elStyle.bottom = "0";
        elStyle.right = "0";
        elStyle.visibility = "hidden";
        return chatEl;
    }
    render = el => document.body.appendChild(el);
}

const chat = new Chat();