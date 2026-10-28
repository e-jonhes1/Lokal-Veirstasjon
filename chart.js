window.Chart = function(ctx, config) {

    this.ctx = ctx;
    this.config = config;
    this.data = config.data.datasets[0];
    this.labels = config.data.labels;
    this.showLabels = false;

    var canvas = ctx.canvas;

    canvas.style.background = "#f8f9fa";
    canvas.style.border = "2px solid #007bff";
    canvas.style.borderRadius = "8px";

    this.update = function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let values = this.data.data;

        if (values.length === 0) {
            return;
        }

        let minVal;
        let maxVal;

        if (this.data.label.includes("Temperatur")) {

            minVal = -10;
            maxVal = 30;

        }
        else if (this.data.label.includes("Vind")) {

            minVal = 0;
            maxVal = 30;

        }
        else {

            minVal = Math.min(...values);
            maxVal = Math.max(...values);
        }

        // Y-skala
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";

        for (let i = 0; i < 5; i++) {

            let verdi = (
                maxVal -
                ((maxVal - minVal) / 4) * i
            ).toFixed(0);

            let y = 10 + i * ((canvas.height - 20) / 4);

            // lite merke på kanten
            // merke på kanten
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(6, y);
            ctx.stroke();

            // svak hjelpelinje
            ctx.strokeStyle = "#dddddd";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();

            ctx.strokeStyle = "#000";

            // tal utanfor grafen
            let tekstY = y + 3;

            if (i === 4) {
                tekstY -= 15;
            }

            ctx.fillText(verdi, 15, tekstY);
        }

        // Graf
        ctx.beginPath();
        ctx.strokeStyle = this.data.borderColor || "#007bff";
        ctx.lineWidth = 3;

        for (let i = 0; i < values.length; i++) {

            let x = (canvas.width / (values.length - 1)) * i;

            let y =
                (canvas.height - 30) -
                ((values[i] - minVal) / (maxVal - minVal))
                * (canvas.height - 60);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        console.log(this.labels);

        if (this.showLabels) {

            ctx.fillStyle = "#000";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            for (let i = 0; i < this.labels.length; i++) {

                let x =
                    20 +
                    ((canvas.width - 40) /
                    (this.labels.length - 1))
                    * i;

                ctx.fillText(
                    this.labels[i],
                    x,
                    canvas.height - 15
                );
            }
        }
    };
};