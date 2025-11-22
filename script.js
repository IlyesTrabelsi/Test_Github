document.addEventListener("DOMContentLoaded", () => {

    const chartScript = document.createElement("script");
    chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.head.appendChild(chartScript);
    chartScript.onload = () => {
        const chois = document.querySelectorAll(".poll-area");
        chois.forEach(poll => {

            const options = poll.querySelectorAll("label");
            let pours = [];
            for (let opt of options) {
                const txt = opt.querySelector(".percent").textContent;
                const val = parseFloat(txt.replace("%", ""));
                pours.push(val);
            }
            let der_chois = -1;
            let isSub = false;
            const showUpdatedResults = () => {
                for (let i = 0; i < options.length; i++) {
                    const pText = options[i].querySelector(".percent");
                    const bar = options[i].querySelector(".progress");
                    let v = Math.round(pours[i]);
                    pText.textContent = v + "%";
                    bar.style.setProperty("--w", v);
                    if (i === der_chois) {
                        options[i].classList.add("selected");
                    } else {
                        options[i].classList.remove("selected");
                    }
                }

                if (poll.voteChart) {
                    poll.voteChart.data.datasets[0].data = pours;
                    poll.voteChart.update();
                }
            };

            options.forEach((opt, index) => {
                opt.addEventListener("click", () => {

                    if (isSub) return;
                    if (der_chois === index) return;

                    pours[index] += 5;

                    if (der_chois !== -1) {
                        pours[der_chois] -= 5;
                        if (pours[der_chois] < 0) pours[der_chois] = 0;
                    } else {
                        for (let i = 0; i < pours.length; i++) {
                            if (i !== index) {
                                pours[i] -= 2;
                                if (pours[i] < 0) pours[i] = 0;
                            }
                        }
                    }

                    let sum = pours.reduce((a, b) => a + b, 0);
                    if (sum !== 100) {
                        pours[index] += 100 - sum;
                    }

                    der_chois = index;
                    showUpdatedResults();
                });
            });
            showUpdatedResults();
            const submitBtn = document.createElement("button");
            submitBtn.textContent = "Submit Vote";
            submitBtn.style.marginTop = "10px";
            submitBtn.style.padding = "8px 12px";
            submitBtn.style.backgroundColor = "#4caf50";
            submitBtn.style.color = "white";
            submitBtn.style.border = "none";
            submitBtn.style.borderRadius = "6px";
            submitBtn.style.cursor = "pointer";
            submitBtn.style.fontSize = "15px";

            poll.insertAdjacentElement("afterend", submitBtn);

            submitBtn.addEventListener("click", () => {
                if (der_chois === -1) {
                    alert("Please choose an option before submitting!");
                    return;
                }
                isSub = true;
                submitBtn.textContent = "Vote Submitted ✅";
                submitBtn.style.backgroundColor = "gray";
                submitBtn.style.cursor = "default";

                options.forEach(op => {
                    op.style.pointerEvents = "none";
                    op.style.opacity = "0.8";
                });
            });

            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.alignItems = "flex-start";

            poll.parentNode.insertBefore(container, poll);
            container.appendChild(poll);

            const canvas = document.createElement("canvas");
            canvas.width = 300;
            canvas.height = 200;
            canvas.style.marginLeft = "200px";
            container.appendChild(canvas);
            const labels = Array.from(options).map(o => {
                return o.querySelector(".text").textContent;
            });

            const ctx = canvas.getContext("2d");

            const voteChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Vote Percentage",
                        data: pours,
                        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"]
                    }]
                },
                options: {
                    indexAxis: "y",
                    responsive: false,
                    scales: {
                        x: { min: 0, max: 100 }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });

            poll.voteChart = voteChart;

        });
    };
});
