class Game{
    _score;
    #counter;
    #strength = 1;

    boosters = [
        {
            "title":"Level 1",
            "cost": 32,
            "strength":1
        },
        {
            "title":"Level 2",
            "cost": 256,
            "strength": 2
        }
    ]

    constructor(){
    this.#counter = document.querySelector("#counter");
    this.score = Number((localStorage.getItem("score") === null)) ? 0: Number(localStorage.getItem("score"));
    document.querySelector("#game").append(this.showBoosts());
    }

    set score(newScore){
        this._score = newScore;
        this.#counter.innerText = this._score;
        localStorage.setItem("score", this._score);
    }
    get score(){
        return this._score;
    }

    click(){
        this.score += this.#strength;
    }

    showBoosts(){
        let container = document.createElement("div");
        container.id = "boosts";
        this.boosters.forEach(boost => container.append(this.createBoostBtn(boost)));
        return container;
    }

    createBoostBtn(boost){
       
        let div = document.createElement("div");

        let span = document.createElement("span");
        span.innerText = `${boost.title} (${boost.strength})`;  

        let button = document.createElement("button");
        button.innerText = boost.cost;
        const updateButtonState = () => {
            button.disabled = (this.score < boost.cost);
        };
        updateButtonState();
        setInterval(updateButtonState, 1);
        button.dataset.cost = boost.cost;
        button.onclick = () =>{
            this.score -=boost.cost;
            this.#strength +=boost.strength;
            if(boost.cost >this.score){
                button.disabled = true;
            }
        }

        div.append(span,button);
        return div;
    }
}